from flask import Blueprint, request, jsonify
from database.db import db
from models.engagement import ContactMessage
from utils.auth_utils import optional_token
from utils.validation import ValidationError, require_fields, clean_text, clean_email

contact_routes = Blueprint("contact_routes", __name__)


@contact_routes.route("/", methods=["POST"])
@optional_token
def submit_contact():
    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["name", "email", "message"])

        contact = ContactMessage(
            user_id=request.user_id,
            name=clean_text(data.get("name"), max_length=100, min_length=2, field_name="name"),
            email=clean_email(data.get("email")),
            message=clean_text(data.get("message"), max_length=2000, min_length=5, field_name="message")
        )
        db.session.add(contact)
        db.session.commit()
        return jsonify({"status": "success", "message": "Your message has been received"}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400
