from flask import Blueprint, request, jsonify
from database.db import db
from models.community import CommunityPost, PostLike, PostComment
from utils.auth_utils import token_required, optional_token
from utils.validation import ValidationError, require_fields, clean_text

community_routes = Blueprint("community_routes", __name__)


@community_routes.route("/posts", methods=["GET"])
@optional_token
def list_posts():
    page = max(int(request.args.get("page", 1)), 1)
    per_page = min(int(request.args.get("per_page", 20)), 50)

    posts = (
        CommunityPost.query
        .order_by(CommunityPost.created_at.desc())
        .offset((page - 1) * per_page)
        .limit(per_page)
        .all()
    )

    return jsonify({
        "status": "success",
        "page": page,
        "data": [p.to_dict(current_user_id=request.user_id) for p in posts]
    })


@community_routes.route("/posts", methods=["POST"])
@token_required
def create_post():
    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["message"])
        message = clean_text(data.get("message"), max_length=2000, min_length=1, field_name="message")

        post = CommunityPost(user_id=request.user_id, message=message, image_url=data.get("image_url"))
        db.session.add(post)
        db.session.commit()
        return jsonify({"status": "success", "data": post.to_dict(current_user_id=request.user_id)}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@community_routes.route("/posts/<int:post_id>/like", methods=["POST"])
@token_required
def toggle_like(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"status": "error", "message": "Post not found"}), 404

    existing = PostLike.query.filter_by(post_id=post_id, user_id=request.user_id).first()

    if existing:
        db.session.delete(existing)
        post.likes_count = max(post.likes_count - 1, 0)
        liked = False
    else:
        db.session.add(PostLike(post_id=post_id, user_id=request.user_id))
        post.likes_count += 1
        liked = True

    db.session.commit()
    return jsonify({"status": "success", "liked": liked, "likes_count": post.likes_count})


@community_routes.route("/posts/<int:post_id>/comments", methods=["GET"])
def list_comments(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"status": "error", "message": "Post not found"}), 404

    comments = PostComment.query.filter_by(post_id=post_id).order_by(PostComment.created_at.asc()).all()
    return jsonify({"status": "success", "data": [c.to_dict() for c in comments]})


@community_routes.route("/posts/<int:post_id>/comments", methods=["POST"])
@token_required
def add_comment(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"status": "error", "message": "Post not found"}), 404

    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["comment"])
        comment_text = clean_text(data.get("comment"), max_length=500, min_length=1, field_name="comment")

        comment = PostComment(post_id=post_id, user_id=request.user_id, comment=comment_text)
        db.session.add(comment)
        db.session.commit()
        return jsonify({"status": "success", "data": comment.to_dict()}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@community_routes.route("/posts/<int:post_id>", methods=["DELETE"])
@token_required
def delete_post(post_id):
    post = CommunityPost.query.get(post_id)
    if not post:
        return jsonify({"status": "error", "message": "Post not found"}), 404
    if post.user_id != request.user_id:
        return jsonify({"status": "error", "message": "You can only delete your own posts"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"status": "success", "message": "Post deleted"})
