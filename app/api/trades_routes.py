from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Trade, Item, User, Image, db
# from ..forms import

trades_routes = Blueprint('trades', __name__)
