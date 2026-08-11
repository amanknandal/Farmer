from flask import Blueprint, jsonify, current_app
import requests
from datetime import datetime
from utils import cache

market_routes = Blueprint("market_routes", __name__)


def _normalize(item):
    return {
        "state": item.get("state", ""),
        "district": item.get("district", ""),
        "market": item.get("market", ""),
        "crop": item.get("commodity", ""),
        "variety": item.get("variety", ""),
        "arrival_date": item.get("arrival_date", ""),
        "min_price": item.get("min_price", ""),
        "max_price": item.get("max_price", ""),
        "modal_price": item.get("modal_price", "")
    }


def _fetch_records():
    cache_key = "market:records"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached, True

    response = requests.get(current_app.config["MARKET_API_URL"], timeout=15)
    response.raise_for_status()
    records = response.json().get("data", [])
    cache.set(cache_key, records, current_app.config["CACHE_TTL_SECONDS"])
    return records, False


@market_routes.route("/", methods=["GET"])
def market_home():
    try:
        records, was_cached = _fetch_records()
        crops = [_normalize(item) for item in records]
        return jsonify({
            "status": "success",
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "total_records": len(crops),
            "cached": was_cached,
            "data": crops
        })
    except requests.RequestException:
        current_app.logger.exception("Market API request failed")
        return jsonify({"status": "error", "message": "Market data unavailable"}), 503


@market_routes.route("/<crop>", methods=["GET"])
def crop_price(crop):
    try:
        records, was_cached = _fetch_records()
        result = [
            _normalize(item)
            for item in records
            if crop.lower() in item.get("commodity", "").lower()
        ]
        return jsonify({
            "status": "success",
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "total_results": len(result),
            "cached": was_cached,
            "data": result
        })
    except requests.RequestException:
        current_app.logger.exception("Market API request failed")
        return jsonify({"status": "error", "message": "Market data unavailable"}), 503
