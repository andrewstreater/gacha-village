from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateField, SelectField, BooleanField, SubmitField
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms.validators import DataRequired
from app.api.aws import ALLOWED_IMG_EXTENSIONS

CONDITIONS = [
    'New',
    'Open box',
    'Very good',
    'Good',
    'Acceptable'
]

EDITIONS = [
    'Standard'
    'Special Edition'
    'Limited'
]

ALBUM_TYPES = ["Album", "Single"]

class CreateItemForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    brand = StringField("Brand", validators=[DataRequired()])
    series = StringField("Series")
    model = StringField("Model")
    releaseDate = DateField("Release Date", validators=[DataRequired()], format="%m/%d/%Y")
    edition = SelectField("Edition")
    condition = SelectField("Condition", choices=CONDITIONS, validators=[DataRequired()])
    description = StringField("Name", validators=[DataRequired()])
    is_tradable = BooleanField('Do you accept trade offers for this item?')
    submit = SubmitField("Submit")
