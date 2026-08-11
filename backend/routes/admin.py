from flask import Blueprint, request, jsonify
from database.db import db
from models.engagement import ContactMessage
from models.community import CommunityPost, PostComment
from models.user import User
from utils.auth_utils import admin_required
from utils.validation import ValidationError, clean_text

admin_routes = Blueprint("admin_routes", __name__)


@admin_routes.route("/contact-messages", methods=["GET"])
@admin_required
def list_contact_messages():
    status = request.args.get("status")
    query = ContactMessage.query
    if status:
        query = query.filter_by(status=status)
    messages = query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({"status": "success", "data": [m.to_dict() for m in messages]})


@admin_routes.route("/contact-messages/<int:message_id>", methods=["PUT"])
@admin_required
def update_contact_status(message_id):
    message = ContactMessage.query.get(message_id)
    if not message:
        return jsonify({"status": "error", "message": "Message not found"}), 404

    data = request.get_json(silent=True) or {}
    new_status = data.get("status")

    if new_status not in ["new", "in_progress", "resolved"]:
        return jsonify({"status": "error", "message": "status must be new, in_progress, or resolved"}), 400

    message.status = new_status
    db.session.commit()
    return jsonify({"status": "success", "data": message.to_dict()})


@admin_routes.route("/community-posts", methods=["GET"])
@admin_required
def list_all_posts():
    posts = CommunityPost.query.order_by(CommunityPost.created_at.desc()).all()
    return jsonify({"status": "success", "data": [p.to_dict() for p in posts]})


@admin_routes.route("/community-posts/<int:post_id>", methods=["DELETE"])
@admin_required
def moderate_delete_post(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"status": "error", "message": "Post not found"}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({"status": "success", "message": "Post removed"})


@admin_routes.route("/community-comments/<int:comment_id>", methods=["DELETE"])
@admin_required
def moderate_delete_comment(comment_id):
    comment = PostComment.query.get(comment_id)
    if not comment:
        return jsonify({"status": "error", "message": "Comment not found"}), 404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"status": "success", "message": "Comment removed"})


@admin_routes.route("/users", methods=["GET"])
@admin_required
def list_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return jsonify({"status": "success", "data": [u.to_dict() for u in users]})
