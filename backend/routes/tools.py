from flask import Blueprint, request, jsonify
from database.db import db
from models.catalog import Tool
from utils.auth_utils import admin_required
from utils.validation import ValidationError, require_fields, clean_text

tools_routes = Blueprint("tools_routes", __name__)


@tools_routes.route("/", methods=["GET"])
def get_tools():
    tools = Tool.query.order_by(Tool.name).all()
    return jsonify({"status": "success", "total_tools": len(tools), "data": [t.to_dict() for t in tools]})


@tools_routes.route("/<int:tool_id>", methods=["GET"])
def get_tool(tool_id):
    tool = Tool.query.get(tool_id)
    if not tool:
        return jsonify({"status": "error", "message": "Tool not found"}), 404
    return jsonify({"status": "success", "data": tool.to_dict()})


@tools_routes.route("/", methods=["POST"])
@admin_required
def create_tool():
    data = request.get_json(silent=True) or {}
    try:
        require_fields(data, ["name", "price", "category"])
        tool = Tool(
            name=clean_text(data.get("name"), max_length=150, min_length=2, field_name="name"),
            price=clean_text(data.get("price"), max_length=50, field_name="price"),
            category=clean_text(data.get("category"), max_length=100, field_name="category"),
            description=clean_text(data.get("description", ""), max_length=1000, field_name="description") if data.get("description") else None
        )
        db.session.add(tool)
        db.session.commit()
        return jsonify({"status": "success", "data": tool.to_dict()}), 201
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@tools_routes.route("/<int:tool_id>", methods=["PUT"])
@admin_required
def update_tool(tool_id):
    tool = Tool.query.get(tool_id)
    if not tool:
        return jsonify({"status": "error", "message": "Tool not found"}), 404

    data = request.get_json(silent=True) or {}
    try:
        if "name" in data:
            tool.name = clean_text(data.get("name"), max_length=150, field_name="name")
        if "price" in data:
            tool.price = clean_text(data.get("price"), max_length=50, field_name="price")
        if "category" in data:
            tool.category = clean_text(data.get("category"), max_length=100, field_name="category")
        if "description" in data:
            tool.description = clean_text(data.get("description"), max_length=1000, field_name="description")

        db.session.commit()
        return jsonify({"status": "success", "data": tool.to_dict()})
    except ValidationError as e:
        return jsonify({"status": "error", "message": e.message}), 400


@tools_routes.route("/<int:tool_id>", methods=["DELETE"])
@admin_required
def delete_tool(tool_id):
    tool = Tool.query.get(tool_id)
    if not tool:
        return jsonify({"status": "error", "message": "Tool not found"}), 404
    db.session.delete(tool)
    db.session.commit()
    return jsonify({"status": "success", "message": "Tool deleted"})
