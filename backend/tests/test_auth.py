def test_signup_creates_user_and_returns_token(client):
    response = client.post("/auth/signup", json={
        "name": "Test Farmer",
        "phone": "9876543210",
        "password": "strongpassword123"
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data["status"] == "success"
    assert "token" in data
    assert data["user"]["phone"] == "9876543210"


def test_signup_rejects_short_password(client):
    response = client.post("/auth/signup", json={
        "name": "Test Farmer",
        "phone": "9876543211",
        "password": "short"
    })
    assert response.status_code == 400


def test_signup_rejects_duplicate_phone(client):
    payload = {"name": "Test Farmer", "phone": "9876543212", "password": "strongpassword123"}
    client.post("/auth/signup", json=payload)
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 409


def test_login_with_correct_credentials(client):
    client.post("/auth/signup", json={
        "name": "Test Farmer",
        "phone": "9876543213",
        "password": "strongpassword123"
    })
    response = client.post("/auth/login", json={
        "phone": "9876543213",
        "password": "strongpassword123"
    })
    assert response.status_code == 200
    assert "token" in response.get_json()


def test_login_with_wrong_password(client):
    client.post("/auth/signup", json={
        "name": "Test Farmer",
        "phone": "9876543214",
        "password": "strongpassword123"
    })
    response = client.post("/auth/login", json={
        "phone": "9876543214",
        "password": "wrongpassword"
    })
    assert response.status_code == 401


def test_me_requires_token(client):
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_me_returns_user_with_valid_token(client):
    signup = client.post("/auth/signup", json={
        "name": "Test Farmer",
        "phone": "9876543215",
        "password": "strongpassword123"
    })
    token = signup.get_json()["token"]
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.get_json()["user"]["phone"] == "9876543215"
