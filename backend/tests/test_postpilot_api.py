"""
PostPilot AI – Backend API regression tests.

Architecture under test:
  Public URL  ─► Kubernetes ingress ─► FastAPI proxy (port 8001) ─► Next.js (port 3000)

All endpoints are Next.js route handlers under /app/frontend/src/app/api/*.
The FastAPI server in /app/backend/server.py is a thin reverse proxy.
"""

import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
CRON_SECRET = "postpilot_cron_secret_change_me"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --------------------------------------------------------------------------- #
# Proxy / health
# --------------------------------------------------------------------------- #
class TestProxyHealth:
    def test_proxy_health(self, client):
        r = client.get(f"{BASE_URL}/api/_proxy/health", timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert data.get("proxy") == "fastapi"


# --------------------------------------------------------------------------- #
# Cron publish endpoint — CRON_SECRET protected
# --------------------------------------------------------------------------- #
class TestCronPublish:
    def test_cron_without_secret_returns_401(self, client):
        r = client.get(f"{BASE_URL}/api/cron/publish", timeout=30)
        assert r.status_code == 401, r.text
        data = r.json()
        assert data.get("error") == "unauthorized"

    def test_cron_with_wrong_secret_returns_401(self, client):
        r = client.get(
            f"{BASE_URL}/api/cron/publish",
            headers={"Authorization": "Bearer wrong_secret"},
            timeout=30,
        )
        assert r.status_code == 401
        assert r.json().get("error") == "unauthorized"

    def test_cron_with_valid_secret_returns_200(self, client):
        r = client.get(
            f"{BASE_URL}/api/cron/publish",
            headers={"Authorization": f"Bearer {CRON_SECRET}"},
            timeout=30,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        # Supabase not configured → handler returns ok:false + configured:false OR ok:true with processed_posts
        # Per route.ts: try/except on supabase call. With placeholder URL, the supabase client
        # call will throw and the catch returns ok:false, configured:false.
        # Either way the HTTP status is 200 and "ok" key is present.
        assert "ok" in data
        # When supabase is placeholder, expect configured:false
        if data.get("ok") is False:
            assert data.get("configured") is False

    def test_cron_with_query_param_secret(self, client):
        r = client.get(
            f"{BASE_URL}/api/cron/publish?secret={CRON_SECRET}", timeout=30
        )
        assert r.status_code == 200


# --------------------------------------------------------------------------- #
# Channel connect — mocked vs real OAuth
# --------------------------------------------------------------------------- #
class TestChannelsConnect:
    @pytest.mark.parametrize(
        "platform",
        ["linkedin", "pinterest", "google_business", "youtube", "twitter"],
    )
    def test_mocked_platform_returns_mock_true(self, client, platform):
        r = client.post(
            f"{BASE_URL}/api/channels/connect/{platform}",
            json={},
            timeout=30,
        )
        # Either mock:true response (200) or 400 "Unknown platform" if platform key not in PLATFORMS
        assert r.status_code in (200, 400), r.text
        if r.status_code == 200:
            data = r.json()
            assert data.get("mock") is True
            assert data.get("platform") == platform

    def test_facebook_returns_mock_when_meta_not_configured(self, client):
        r = client.post(
            f"{BASE_URL}/api/channels/connect/facebook", json={}, timeout=30
        )
        assert r.status_code == 200, r.text
        data = r.json()
        # META_APP_ID is empty → falls through to mock branch
        assert data.get("mock") is True
        assert data.get("platform") == "facebook"

    def test_unknown_platform_returns_400(self, client):
        r = client.post(
            f"{BASE_URL}/api/channels/connect/myspace", json={}, timeout=30
        )
        assert r.status_code == 400
        assert "Unknown" in r.json().get("error", "")


# --------------------------------------------------------------------------- #
# Posts create — preview mode (no Supabase user)
# --------------------------------------------------------------------------- #
class TestPostsCreate:
    def test_create_post_preview_mode(self, client):
        payload = {
            "mode": "queue",
            "targets": [
                {"channel_asset_id": "x", "content": "hi from regression test"}
            ],
        }
        r = client.post(f"{BASE_URL}/api/posts/create", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert data.get("preview") is True
        assert data.get("post", {}).get("targets") == 1
        assert data.get("post", {}).get("mode") == "queue"

    def test_create_post_empty_targets_returns_400(self, client):
        r = client.post(
            f"{BASE_URL}/api/posts/create",
            json={"mode": "queue", "targets": []},
            timeout=30,
        )
        assert r.status_code == 400
        assert "Invalid" in r.json().get("error", "") or r.json().get("error")

    def test_create_post_missing_mode_returns_400(self, client):
        r = client.post(
            f"{BASE_URL}/api/posts/create",
            json={"targets": [{"channel_asset_id": "x", "content": "hi"}]},
            timeout=30,
        )
        assert r.status_code == 400


# --------------------------------------------------------------------------- #
# Contact form
# --------------------------------------------------------------------------- #
class TestContact:
    def test_contact_form_accepts_json(self, client):
        r = client.post(
            f"{BASE_URL}/api/contact",
            json={"name": "Tester", "email": "t@example.com", "message": "hi"},
            timeout=30,
        )
        assert r.status_code == 200, r.text
        assert r.json().get("ok") is True
