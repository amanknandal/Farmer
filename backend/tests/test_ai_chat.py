from unittest.mock import patch


def test_chat_requires_message(client):
    response = client.post("/ai/chat", json={})
    assert response.status_code == 400


def test_chat_rejects_overlong_message(client):
    response = client.post("/ai/chat", json={"message": "a" * 2000})
    assert response.status_code == 400


@patch("routes.ai.ollama.chat")
def test_chat_returns_ai_reply(mock_ollama_chat, client):
    mock_ollama_chat.return_value = {"message": {"content": "Water your wheat crop every 5 to 7 days."}}

    response = client.post("/ai/chat", json={"message": "How often should I water wheat?"})

    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "success"
    assert "Water your wheat" in data["reply"]


@patch("routes.ai.ollama.chat")
def test_chat_handles_model_failure_gracefully(mock_ollama_chat, client):
    mock_ollama_chat.side_effect = Exception("model unavailable")

    response = client.post("/ai/chat", json={"message": "How often should I water wheat?"})

    assert response.status_code == 503
    assert response.get_json()["status"] == "error"
