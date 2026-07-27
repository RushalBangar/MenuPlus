from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_get_menu():
    response = client.get("/api/menu")
    # Our API might return 200 with data or 503 if Supabase is down
    assert response.status_code in [200, 503]
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            assert "name" in data[0]
            assert "price" in data[0]

def test_get_orders():
    response = client.get("/api/orders")
    assert response.status_code in [200, 503]
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, list)

def test_ai_recommendations_endpoint_exists():
    response = client.post("/api/ai/recommendations", json={"cart_item_ids": [1, 2]})
    # May return 200, 500 (if AI error), or 503 (if Supabase down)
    assert response.status_code in [200, 500, 503]
