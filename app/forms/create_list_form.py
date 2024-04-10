from flask_wtf import FlaskForm
from wtforms.fields import StringField, BooleanField, SubmitField
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms.validators import DataRequired


class CreateListForm(FlaskForm):
    name = StringField("Title", validators=[DataRequired()])
    private = BooleanField('Is this a private list?')
    submit = SubmitField("Submit")
