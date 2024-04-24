from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateField, SelectField, BooleanField, SubmitField
# from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms.validators import DataRequired

class AddImageForm(FlaskForm):
    preview = BooleanField('Will this be your preview Image?')
    image_url = StringField("Paste Image URL Here", validators=[DataRequired()])
    submit = SubmitField("Submit")
