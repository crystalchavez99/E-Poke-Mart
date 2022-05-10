from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Review

class NewReview(FlaskForm):
    content = StringField('content',validators=[DataRequired()])