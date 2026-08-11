from flask import Blueprint, request, jsonify, current_app
import ollama
from database.db import db
from models.engagement import AiChatHistory
from utils.auth_utils import optional_token

ai_routes = Blueprint("ai_routes", __name__)

SYSTEM_PROMPT_TEMPLATE = """
You are AgroSmart AI, an intelligent farming assistant.
Your job:
- Help farmers
- Give crop suggestions
- Explain fertilizers
- Explain irrigation timing
- Give pest control advice
- Explain farming in simple language
Rules:
- Keep answers practical
- Keep answers short and useful
- Use farmer-friendly language
- Avoid complicated scientific terms
- Respond in {language}
"""

SUPPORTED_LANGUAGES = {"en": "English", "hi": "Hindi"}
MAX_MESSAGE_LENGTH = 1000


@ai_routes.route("/", methods=["GET"])
def ai_home():
    return jsonify({"status": "success", "message": "AI Routes Working"})


@ai_routes.route("/chat", methods=["POST"])
@optional_token
def chat():
    data = request.get_json(silent=True) or {}
    user_message = (data.get("message") or "").strip()
    language_code = data.get("language", "en")

    if not user_message:
        return jsonify({"status": "error", "message": "Message is required"}), 400

    if len(user_message) > MAX_MESSAGE_LENGTH:
        return jsonify({"status": "error", "message": "Message too long"}), 400

    language_name = SUPPORTED_LANGUAGES.get(language_code, "English")
    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(language=language_name)

    try:
        response = ollama.chat(
            model=current_app.config["OLLAMA_MODEL"],
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        ai_reply = response["message"]["content"]

        db.session.add(AiChatHistory(user_id=request.user_id, message=user_message, reply=ai_reply))
        db.session.commit()

        return jsonify({
            "status": "success",
            "user_message": user_message,
            "reply": ai_reply
        })
    except Exception:
        current_app.logger.exception("AI chat failed")
        return jsonify({
            "status": "error",
            "message": "AI assistant is temporarily unavailable"
        }), 503
