from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .list_item import ListItem

class List(db.Model):
    __tablename__ = "lists"

    # DEFINE RELATIONSHIPS HERE
    user = relationship("User", back_populates="lists")
    items = relationship('Item', secondary=ListItem, back_populates='lists')

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # DEFINE COLUMNS HERE
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'listId': self.id,
            'name': self.name,
            'userId': self.user_id,
            'private': self.private
        }
