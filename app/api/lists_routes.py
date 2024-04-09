from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import List, Item, User, Image, db

lists_routes = Blueprint('lists', __name__)
