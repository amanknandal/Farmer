import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

from config import config_map
from database.db import db, bcrypt, migrate
from models import user, catalog, community, engagement
from routes.ai import ai_routes
from routes.weather import weather_routes
from routes.market import market_routes
from routes.crops import crop_routes
from routes.tools import tools_routes
from routes.auth import auth_routes
from routes.community import community_routes
from routes.contact import contact_routes
from routes.newsletter import newsletter_routes
from routes.admin import admin_routes
from routes.schemes_api import schemes_bp
load_dotenv()


def create_app():
    app = Flask(__name__)

    env = os.environ.get("FLASK_ENV", "development")
    app.config.from_object(config_map.get(env, config_map["development"]))

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    CORS(app, origins=app.config["CORS_ORIGINS"], supports_credentials=True)

    limiter = Limiter(get_remote_address, app=app, default_limits=["200 per hour"])
    limiter.limit("20 per minute")(ai_routes)
    limiter.limit("10 per minute")(auth_routes)

    logging.basicConfig(level=logging.INFO)

    app.register_blueprint(auth_routes, url_prefix="/auth")
    app.register_blueprint(ai_routes, url_prefix="/ai")
    app.register_blueprint(weather_routes, url_prefix="/weather")
    app.register_blueprint(market_routes, url_prefix="/market")
    app.register_blueprint(crop_routes, url_prefix="/crops")
    app.register_blueprint(tools_routes, url_prefix="/tools")
    app.register_blueprint(community_routes, url_prefix="/community")
    app.register_blueprint(contact_routes, url_prefix="/contact")
    app.register_blueprint(newsletter_routes, url_prefix="/newsletter")
    app.register_blueprint(admin_routes, url_prefix="/admin")
    app.register_blueprint(schemes_bp)
    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"status": "success", "message": "AgroSmart Backend Running"})

    @app.route("/health", methods=["GET"])
    def health():
        try:
            db.session.execute(db.text("SELECT 1"))
            db_status = "connected"
        except Exception:
            db_status = "unavailable"
        return jsonify({"status": "success", "database": db_status})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"status": "error", "message": "Route not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        app.logger.exception("Unhandled server error")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

    @app.errorhandler(429)
    def rate_limited(e):
        return jsonify({"status": "error", "message": "Too many requests, slow down"}), 429

    return app


app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=app.config["DEBUG"])
