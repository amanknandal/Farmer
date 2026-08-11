from flask import Blueprint, request, jsonify
from database.db import db
from models.engagement import NewsletterSubscriber
from utils.validation import ValidationError, require_fields, clean_email

newsletter_routes = Blueprint("newsletter_routes", __name__)


@newsletter_routes.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["email"])
        email = clean_email(data.get("email"))

        if NewsletterSubscriber.query.filter_by(email=email).first():
            return jsonify({"status": "success", "message": "Already subscribed"})

        db.session.add(NewsletterSubscriber(email=email))
        db.session.commit()
        return jsonify({"status": "success", "message": "Subscribed successfully"}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400
