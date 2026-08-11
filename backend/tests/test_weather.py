from unittest.mock import patch, MagicMock


def _mock_weather_response():
    mock_response = MagicMock()
    mock_response.raise_for_status.return_value = None
    mock_response.json.return_value = {
        "current_condition": [{
            "temp_C": "28", "FeelsLikeC": "30", "humidity": "60",
            "weatherDesc": [{"value": "Sunny"}],
            "windspeedKmph": "10", "pressure": "1012", "visibility": "10", "uvIndex": "5"
        }],
        "weather": [{
            "hourly": [{
                "time": "1200", "tempC": "28",
                "weatherDesc": [{"value": "Sunny"}],
                "chanceofrain": "0"
            }]
        }]
    }
    return mock_response


@patch("routes.weather.requests.get")
def test_get_weather_returns_data(mock_get, client):
    mock_get.return_value = _mock_weather_response()

    response = client.get("/weather/Delhi")

    assert response.status_code == 200
    data = response.get_json()
    assert data["data"]["city"] == "Delhi"
    assert data["data"]["current"]["temperature"] == "28"


@patch("routes.weather.requests.get")
def test_get_weather_handles_api_failure(mock_get, client):
    import requests
    mock_get.side_effect = requests.RequestException("timeout")

    response = client.get("/weather/Delhi")

    assert response.status_code == 503
