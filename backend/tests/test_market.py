from unittest.mock import patch, MagicMock


def _mock_market_response():
    mock_response = MagicMock()
    mock_response.raise_for_status.return_value = None
    mock_response.json.return_value = {
        "data": [
            {
                "state": "Punjab", "district": "Ludhiana", "market": "Ludhiana Mandi",
                "commodity": "Wheat", "variety": "Standard", "arrival_date": "2026-08-01",
                "min_price": "2000", "max_price": "2200", "modal_price": "2100"
            }
        ]
    }
    return mock_response


@patch("routes.market.requests.get")
def test_market_home_returns_records(mock_get, client):
    mock_get.return_value = _mock_market_response()

    response = client.get("/market/")

    assert response.status_code == 200
    data = response.get_json()
    assert data["total_records"] == 1
    assert data["data"][0]["crop"] == "Wheat"


@patch("routes.market.requests.get")
def test_crop_price_filters_by_commodity(mock_get, client):
    mock_get.return_value = _mock_market_response()

    response = client.get("/market/wheat")

    assert response.status_code == 200
    data = response.get_json()
    assert data["total_results"] == 1


@patch("routes.market.requests.get")
def test_market_handles_api_failure(mock_get, client):
    import requests
    mock_get.side_effect = requests.RequestException("timeout")

    response = client.get("/market/")

    assert response.status_code == 503
