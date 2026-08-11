from database.db import db


class CommunityPost(db.Model):
    __tablename__ = "community_posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(500))
    likes_count = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    author = db.relationship("User", backref="posts")

    def to_dict(self, current_user_id=None):
        liked = False
        if current_user_id:
            liked = PostLike.query.filter_by(post_id=self.id, user_id=current_user_id).first() is not None
        return {
            "id": self.id,
            "author_name": self.author.name if self.author else "Unknown",
            "message": self.message,
            "image_url": self.image_url,
            "likes_count": self.likes_count,
            "liked_by_me": liked,
            "comment_count": PostComment.query.filter_by(post_id=self.id).count(),
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class PostLike(db.Model):
    __tablename__ = "post_likes"
    __table_args__ = (db.UniqueConstraint("post_id", "user_id", name="uq_post_user_like"),)

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class PostComment(db.Model):
    __tablename__ = "post_comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("community_posts.id", ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    author = db.relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "author_name": self.author.name if self.author else "Unknown",
            "comment": self.comment,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
