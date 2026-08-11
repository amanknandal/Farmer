from flask import Blueprint, request, jsonify
from database.db import db
from models.catalog import Crop
from utils.auth_utils import admin_required
from utils.validation import ValidationError, require_fields, clean_text

crop_routes = Blueprint("crop_routes", __name__)


@crop_routes.route("/", methods=["GET"])
def all_crops():
    crops = Crop.query.order_by(Crop.name).all()
    return jsonify({"status": "success", "total_crops": len(crops), "data": [c.to_dict() for c in crops]})


@crop_routes.route("/<int:crop_id>", methods=["GET"])
def crop_details(crop_id):
    crop = Crop.query.get(crop_id)
    if not crop:
        return jsonify({"status": "error", "message": "Crop not found"}), 404
    return jsonify({"status": "success", "data": crop.to_dict()})


@crop_routes.route("/recommend", methods=["POST"])
def recommend_crop():
    data = request.get_json(silent=True) or {}
    soil = (data.get("soil") or "").strip().lower()

    if not soil:
        return jsonify({"status": "error", "message": "soil is required"}), 400

    matches = Crop.query.filter(Crop.soil.ilike(f"%{soil}%")).all()
    return jsonify({"status": "success", "recommended_crops": [c.to_dict() for c in matches]})


@crop_routes.route("/", methods=["POST"])
@admin_required
def create_crop():
    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["name", "season", "soil", "water_requirement", "temperature", "fertilizer"])
        name = clean_text(data.get("name"), max_length=100, min_length=2, field_name="name")

        if Crop.query.filter_by(name=name).first():
            return jsonify({"status": "error", "message": "A crop with this name already exists"}), 409

        crop = Crop(
            name=name,
            season=clean_text(data.get("season"), max_length=50, field_name="season"),
            soil=clean_text(data.get("soil"), max_length=100, field_name="soil"),
            water_requirement=clean_text(data.get("water_requirement"), max_length=50, field_name="water_requirement"),
            temperature=clean_text(data.get("temperature"), max_length=50, field_name="temperature"),
            fertilizer=clean_text(data.get("fertilizer"), max_length=150, field_name="fertilizer")
        )
        db.session.add(crop)
        db.session.commit()
        return jsonify({"status": "success", "data": crop.to_dict()}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@crop_routes.route("/<int:crop_id>", methods=["PUT"])
@admin_required
def update_crop(crop_id):
    crop = Crop.query.get(crop_id)
    if not crop:
        return jsonify({"status": "error", "message": "Crop not found"}), 404

    data = request.get_json(silent=True) or {}
    try:
        for field, max_len in [
            ("name", 100), ("season", 50), ("soil", 100),
            ("water_requirement", 50), ("temperature", 50), ("fertilizer", 150)
        ]:
            if field in data:
                setattr(crop, field, clean_text(data.get(field), max_length=max_len, field_name=field))

        db.session.commit()
        return jsonify({"status": "success", "data": crop.to_dict()})
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@crop_routes.route("/<int:crop_id>", methods=["DELETE"])
@admin_required
def delete_crop(crop_id):
    crop = Crop.query.get(crop_id)
    if not crop:
        return jsonify({"status": "error", "message": "Crop not found"}), 404
    db.session.delete(crop)
    db.session.commit()
    return jsonify({"status": "success", "message": "Crop deleted"})
