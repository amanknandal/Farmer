from database.db import db


class Crop(db.Model):
    __tablename__ = "crops"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    season = db.Column(db.String(50), nullable=False)
    soil = db.Column(db.String(100), nullable=False)
    water_requirement = db.Column(db.String(50), nullable=False)
    temperature = db.Column(db.String(50), nullable=False)
    fertilizer = db.Column(db.String(150), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "season": self.season,
            "soil": self.soil,
            "water_requirement": self.water_requirement,
            "temperature": self.temperature,
            "fertilizer": self.fertilizer
        }


class Tool(db.Model):
    __tablename__ = "tools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "category": self.category,
            "description": self.description
        }
