from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

table_name = 'list_items'

ListItem = db.Table(table_name,
    db.Model.metadata,
    db.Column('list_id', db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False),
    db.Column('item_id', db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
)

if environment == "production":
    ListItem.schema = SCHEMA
