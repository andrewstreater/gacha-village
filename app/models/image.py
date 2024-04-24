from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Image(db.Model):
    __tablename__ = "images"

    # DEFINE RELATIONSHIPS HERE
    item = relationship('Item', back_populates="images")

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # DEFINE COLUMNS HERE
    id = db.Column(db.Integer, primary_key=True)
    imageable_type = db.Column(db.String(40), nullable=False)
    imageable_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    image_url = db.Column(db.String())
    preview = db.Column(db.Boolean, nullable=False, default=False)


    def to_dict(self):
        return {
            'imageId': self.id,
            'imageableType': self.imageable_type,
            'imageableId': self.imageable_id,
            'imageUrl': self.image_url,
            'preview': self.preview
        }
