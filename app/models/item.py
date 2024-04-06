from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .list_item import ListItem

class Item(db.Model):
    __tablename__ = "items"

    # DEFINE RELATIONSHIPS HERE
    owner = relationship("User", back_populates="items")
    lists = relationship('List', secondary=ListItem, back_populates='items')
    trade_buyer = relationship("Trade", back_populates="buyer_item")
    trade_seller = relationship("Trade", back_populates="seller_item")

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # DEFINE COLUMNS HERE
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    brand = db.Column(db.String(40), nullable=False)
    series = db.Column(db.String(40))
    model = db.Column(db.String(40))
    release_date = db.Column(db.Date, nullable=False)
    edition = db.Column(db.String(40))
    condition = db.Column(db.String(40))
    description = db.Column(db.String(500))
    is_tradable = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'itemId': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'brand': self.brand,
            'series': self.series,
            'model': self.model,
            'release_date': self.release_date,
            'edition': self.edition,
            'condition': self.condition,
            'description': self.description,
            'is_tradable': self.is_tradable,
        }
