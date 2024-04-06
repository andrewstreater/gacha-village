from app.models import db, ListItem, environment, SCHEMA
from sqlalchemy.sql import text, insert


# Adds a demo user, you can add other users here if you want
def seed_listItems():

    seeds = [
        {'list_id':1, 'item_id':2}, # List 1
        {'list_id':1, 'item_id':4},
        {'list_id':1, 'item_id':6},
        {'list_id':1, 'item_id':8}, # --> List 2 (empty list)
        {'list_id':3, 'item_id':1}, # List 3 (private list)
        {'list_id':3, 'item_id':3},
        {'list_id':3, 'item_id':5},
        {'list_id':3, 'item_id':7},
        {'list_id':4, 'item_id':1}, # List 4
        {'list_id':4, 'item_id':2},
        {'list_id':4, 'item_id':3},
        {'list_id':4, 'item_id':4},
        {'list_id':4, 'item_id':5},
        {'list_id':4, 'item_id':6},
        {'list_id':4, 'item_id':7},
        {'list_id':4, 'item_id':8},
        {'list_id':5, 'item_id':13} # List 5
    ]

    db.session.execute(insert(ListItem), seeds)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_listItems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_items"))

    db.session.commit()
