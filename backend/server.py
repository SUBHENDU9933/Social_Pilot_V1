"""
FastAPI thin reverse-proxy.

The Kubernetes ingress in this preview environment forwards any path that
starts with `/api` to port 8001 (this service). The real Next.js application
(which contains all of the actual API route handlers under `src/app/api/*`)
runs on port 3000. This proxy forwards `/api/*` requests to Next.js so that
the Next.js API routes are reachable from the public URL.

In production (Vercel) this proxy is NOT used — Next.js handles `/api/*`
directly. This file exists purely for the dev preview environment.
"""

import os
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

NEXT_INTERNAL_URL = os.environ.get("NEXT_INTERNAL_URL", "http://localhost:3000")

app = FastAPI(title="PostPilot AI – Next.js Proxy")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_client: httpx.AsyncClient | None = None


@app.on_event("startup")
async def _startup() -> None:
    global _client
    _client = httpx.AsyncClient(timeout=60.0)


@app.on_event("shutdown")
async def _shutdown() -> None:
    global _client
    if _client is not None:
        await _client.aclose()


@app.get("/api/_proxy/health")
async def health() -> dict:
    return {"ok": True, "proxy": "fastapi", "target": NEXT_INTERNAL_URL}


HOP_BY_HOP = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "host",
    "content-length",
}


@app.api_route(
    "/api/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
)
async def proxy(path: str, request: Request) -> Response:
    """Forward every `/api/*` request to Next.js on port 3000."""
    assert _client is not None
    target_url = f"{NEXT_INTERNAL_URL}/api/{path}"
    if request.url.query:
        target_url += f"?{request.url.query}"

    body = await request.body()
    forward_headers = {
        k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP
    }

    try:
        upstream = await _client.request(
            request.method,
            target_url,
            headers=forward_headers,
            content=body,
            follow_redirects=False,
        )
    except httpx.RequestError as exc:
        return JSONResponse(
            {"error": "Upstream Next.js server unavailable", "detail": str(exc)},
            status_code=502,
        )

    resp_headers = {
        k: v for k, v in upstream.headers.items() if k.lower() not in HOP_BY_HOP
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=resp_headers,
    )


@app.get("/")
async def root() -> dict:
    return {"service": "PostPilot AI proxy", "ok": True}
