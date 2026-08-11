from flask import Blueprint, request, jsonify
from database.db import db
from models.user import User
from utils.auth_utils import generate_token, token_required

auth_routes = Blueprint("auth_routes", __name__)


@auth_routes.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    email = data.get("email", "").strip() or None
    password = data.get("password", "")

    if not name or not phone or not password:
        return jsonify({"status": "error", "message": "name, phone and password are required"}), 400

    if len(password) < 8:
        return jsonify({"status": "error", "message": "Password must be at least 8 characters"}), 400

    if User.query.filter_by(phone=phone).first():
        return jsonify({"status": "error", "message": "Phone number already registered"}), 409

    user = User(name=name, phone=phone, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    token = generate_token(user.id)
    return jsonify({"status": "success", "token": token, "user": user.to_dict()}), 201


@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    if not phone or not password:
        return jsonify({"status": "error", "message": "phone and password are required"}), 400

    user = User.query.filter_by(phone=phone).first()
    if not user or not user.check_password(password):
        return jsonify({"status": "error", "message": "Invalid phone or password"}), 401

    token = generate_token(user.id)
    return jsonify({"status": "success", "token": token, "user": user.to_dict()})


@auth_routes.route("/me", methods=["GET"])
@token_required
def me():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    return jsonify({"status": "success", "user": user.to_dict()})
