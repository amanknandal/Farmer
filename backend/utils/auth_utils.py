import jwt
from functools import wraps
from datetime import datetime, timezone
from flask import request, jsonify, current_app
from database.db import db
from models.user import User


def generate_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.now(timezone.utc) + current_app.config["JWT_ACCESS_TOKEN_EXPIRES"]
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")


def decode_token(token):
    return jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])


def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"status": "error", "message": "Missing or invalid token"}), 401
        token = auth_header.split(" ")[1]
        try:
            payload = decode_token(token)
            request.user_id = payload["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"status": "error", "message": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"status": "error", "message": "Invalid token"}), 401
        return f(*args, **kwargs)
    return wrapper


def optional_token(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        request.user_id = None
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                payload = decode_token(token)
                request.user_id = payload["user_id"]
            except jwt.PyJWTError:
                request.user_id = None
        return f(*args, **kwargs)
    return wrapper


def admin_required(f):
    @wraps(f)
    @token_required
    def wrapper(*args, **kwargs):
        user = User.query.get(request.user_id)
        if not user or not user.is_admin():
            return jsonify({"status": "error", "message": "Admin access required"}), 403
        return f(*args, **kwargs)
    return wrapper
