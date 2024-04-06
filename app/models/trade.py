from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Trade(db.Model):
    __tablename__ = "trades"

    # DEFINE RELATIONSHIPS HERE
    reviews = relationship('Review', back_populates='trades')
    buyer_item = relationship('Item', back_populates='trade_buyer')
    seller_item = relationship('Item', back_populates='trade_seller')

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # DEFINE COLUMNS HERE
    id = db.Column(db.Integer, primary_key=True)
    buyer_item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    seller_item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    status = db.Column(db.String(), nullable=False, default="open")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


    def to_dict(self):
        return {
            'tradeId': self.id,
            'buyerItemId': self.buyer_item_id,
            'sellerItemId': self.seller_item_id,
            'status': self.status,
        }
