from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_images():
    # Preview Images
    image1 = Image(
        imageable_type="item", imageable_id=1, preview=True, image_url='https://i.imgur.com/EVyCB8D.jpg')
    image2 = Image(
        imageable_type="item", imageable_id=2, preview=True, image_url='https://i.imgur.com/82cVPnX.jpg')
    image3 = Image(
        imageable_type="item", imageable_id=3, preview=True, image_url='https://i.imgur.com/6dBHkKB.jpg')
    image4 = Image(
        imageable_type="item", imageable_id=4, preview=True, image_url='https://i.imgur.com/3zJw9ei.jpg')
    image5 = Image(
        imageable_type="item", imageable_id=5, preview=True, image_url='https://i.imgur.com/hbvHxNj.jpg')
    image6 = Image(
        imageable_type="item", imageable_id=6, preview=True, image_url='https://i.imgur.com/Z5YAgQj.jpg')
    image7 = Image(
        imageable_type="item", imageable_id=7, preview=True, image_url='https://i.imgur.com/ijD21UX.jpg')
    image8 = Image(
        imageable_type="item", imageable_id=8, preview=True, image_url='https://i.imgur.com/H32Fj5r.jpg')
    image9 = Image(
        imageable_type="item", imageable_id=9, preview=True, image_url='https://i.imgur.com/j6mGy5i.jpg')
    image10 = Image(
        imageable_type="item", imageable_id=10, preview=True, image_url='https://i.imgur.com/LsQq9cx.jpg')
    image11 = Image(
        imageable_type="item", imageable_id=11, preview=True, image_url='https://i.imgur.com/gKzlu6A.jpg')
    image12 = Image(
        imageable_type="item", imageable_id=12, preview=True, image_url='https://i.imgur.com/q7lXXP0.jpg')
    image13 = Image(
        imageable_type="item", imageable_id=13, preview=True, image_url='')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)

    # other images

    image14 = Image(
        imageable_type="item", imageable_id=3, preview=False, image_url='https://i.imgur.com/huDp3DO.jpg')
    image15 = Image(
        imageable_type="item", imageable_id=4, preview=False, image_url='https://i.imgur.com/qLd17eq.jpg')
    image16 = Image(
        imageable_type="item", imageable_id=5, preview=False, image_url='https://i.imgur.com/yeFL39s.jpg')
    image17 = Image(
        imageable_type="item", imageable_id=8, preview=False, image_url='https://i.imgur.com/cE0UYkp.jpg')
    image18 = Image(
        imageable_type="item", imageable_id=9, preview=False, image_url='https://i.imgur.com/E0hj2EI.jpg')
    image19 = Image(
        imageable_type="item", imageable_id=9, preview=False, image_url='https://i.imgur.com/hniQjCV.jpg')
    image20 = Image(
        imageable_type="item", imageable_id=9, preview=False, image_url='https://i.imgur.com/t49e7H6.jpg')
    image21 = Image(
        imageable_type="item", imageable_id=10, preview=False, image_url='https://i.imgur.com/446509C.jpg')
    image22 = Image(
        imageable_type="item", imageable_id=10, preview=False, image_url='https://i.imgur.com/VfhGfBR.jpg')
    image23 = Image(
        imageable_type="item", imageable_id=10, preview=False, image_url='https://i.imgur.com/iBPydAa.jpg')
    image24 = Image(
        imageable_type="item", imageable_id=11, preview=False, image_url='https://i.imgur.com/TqyqoZl.jpg')
    image25 = Image(
        imageable_type="item", imageable_id=11, preview=False, image_url='https://i.imgur.com/F7w2xd1.jpg')
    image26 = Image(
        imageable_type="item", imageable_id=11, preview=False, image_url='https://i.imgur.com/nuGBBg8.jpg')
    image27 = Image(
        imageable_type="item", imageable_id=12, preview=False, image_url='https://i.imgur.com/85MtbLq.jpg')
    image28 = Image(
        imageable_type="item", imageable_id=12, preview=False, image_url='https://i.imgur.com/YuJGzkc.jpg')
    image29 = Image(
        imageable_type="item", imageable_id=12, preview=False, image_url='https://i.imgur.com/Ey4VBk4.jpg')

    image30 = Image(
        imageable_type="item", imageable_id=13, preview=False, image_url='https://i.imgur.com/XEvShNw.jpg')
    image31 = Image(
        imageable_type="item", imageable_id=13, preview=False, image_url='https://i.imgur.com/gZsVuMN.jpg')
    image32 = Image(
        imageable_type="item", imageable_id=13, preview=False, image_url='https://i.imgur.com/12c0kFI.jpg')
    image33 = Image(
        imageable_type="item", imageable_id=13, preview=False, image_url='https://i.imgur.com/dmeKGBO.jpg')
    image34 = Image(
        imageable_type="item", imageable_id=13, preview=False, image_url='https://i.imgur.com/TaNQVNO.jpg')

    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)

    db.session.add(image30)
    db.session.add(image31)
    db.session.add(image32)
    db.session.add(image33)
    db.session.add(image34)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
