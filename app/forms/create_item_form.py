from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateField, SelectField, BooleanField, SubmitField
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms.validators import DataRequired

CONDITIONS = [
    'New',
    'Open Box',
    'Very Good',
    'Good',
    'Acceptable',
    'Repaired',
    'For parts or not working'
]

EDITIONS = [
    'Standard',
    'Special',
    'Limited'
]


class CreateItemForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    brand = StringField("Brand", validators=[DataRequired()])
    series = StringField("Series")
    model = StringField("Model")
    release_date = DateField("Release Date", validators=[DataRequired()], format="%m/%d/%Y")
    edition = SelectField("Edition", choices=EDITIONS)
    condition = SelectField("Condition", choices=CONDITIONS, validators=[DataRequired()])
    description = StringField("Name", validators=[DataRequired()])
    is_tradable = BooleanField('Do you accept trade offers for this item?')
    submit = SubmitField("Submit")
