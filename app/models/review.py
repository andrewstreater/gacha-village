from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    # DEFINE RELATIONSHIPS HERE
    trades = relationship('Trade', back_populates='reviews')

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # DEFINE COLUMNS HERE
    id = db.Column(db.Integer, primary_key=True)
    trade_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('trades.id')), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'reviewId': self.id,
            'tradeId': self.trade_id,
            'userId': self.user_id,
            'review': self.review,
            'stars': self.stars
        }
