"""Pytest conftest — loads REACT_APP_BACKEND_URL from /app/frontend/.env so the
backend regression suite can be invoked simply as `pytest backend/tests/`."""

import os
from pathlib import Path


def _load_frontend_env():
    env_path = Path("/app/frontend/.env")
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        os.environ.setdefault(k, v)


_load_frontend_env()
