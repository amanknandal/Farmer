from flask import Blueprint, jsonify, current_app
import requests
from datetime import datetime
from utils import cache

weather_routes = Blueprint("weather_routes", __name__)


@weather_routes.route("/", methods=["GET"])
def weather_home():
    return jsonify({"status": "success", "message": "Live Weather Routes Working"})


@weather_routes.route("/<city>", methods=["GET"])
def get_weather(city):
    cache_key = f"weather:{city.lower()}"
    cached = cache.get(cache_key)
    if cached:
        return jsonify({"status": "success", "data": cached, "cached": True})

    try:
        url = f"https://wttr.in/{city}?format=j1"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        current = data["current_condition"][0]
        hourly_data = data["weather"][0]["hourly"]

        weather_data = {
            "city": city.title(),
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "current": {
                "temperature": current["temp_C"],
                "feels_like": current["FeelsLikeC"],
                "humidity": current["humidity"],
                "weather": current["weatherDesc"][0]["value"],
                "wind_speed": current["windspeedKmph"],
                "pressure": current["pressure"],
                "visibility": current["visibility"],
                "uv_index": current["uvIndex"]
            },
            "today_forecast": [
                {
                    "time": hour["time"],
                    "temperature": hour["tempC"],
                    "weather": hour["weatherDesc"][0]["value"],
                    "chance_of_rain": hour["chanceofrain"]
                }
                for hour in hourly_data
            ]
        }

        cache.set(cache_key, weather_data, current_app.config["CACHE_TTL_SECONDS"])
        return jsonify({"status": "success", "data": weather_data, "cached": False})

    except requests.RequestException:
        current_app.logger.exception("Weather API request failed")
        return jsonify({"status": "error", "message": "Weather service unavailable"}), 503
    except (KeyError, IndexError):
        current_app.logger.exception("Unexpected weather API response")
        return jsonify({"status": "error", "message": "City not found or invalid response"}), 404
