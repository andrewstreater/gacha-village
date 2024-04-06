from app.models import db, Trade, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_trades():
    trade1 = Trade(
        buyer_item_id=1, seller_item_id=2, status='open')
    trade2 = Trade(
        buyer_item_id=3, seller_item_id=4, status='closed-rejected')
    trade3 = Trade(
        buyer_item_id=6, seller_item_id=5, status='accepted')
    trade4 = Trade(
        buyer_item_id=8, seller_item_id=7, status='pending')
    trade5 = Trade(
        buyer_item_id=9, seller_item_id=10, status='closed-accepted')

    db.session.add(trade1)
    db.session.add(trade2)
    db.session.add(trade3)
    db.session.add(trade4)
    db.session.add(trade5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_trades():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.trades RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM trades"))

    db.session.commit()
