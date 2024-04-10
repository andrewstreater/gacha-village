from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import List, Item, User, Image, db

lists_routes = Blueprint('lists', __name__)

@lists_routes.route('/current')
@login_required
def get_lists_by_current_user():
    userLists = List.query.filter(List.user_id == current_user.id)
    response = {
        "Lists": {
            "byId": [],
            "allLists": []
        }
    }
    if not userLists:
        response = jsonify({"error": "You don't have any lists yet"})
        response.status_code = 404
        return response

    for lst in userLists:
        list_data = lst.to_dict()
        response['Lists']["byId"].append(list_data["listId"])
        response['Lists']["allLists"].append(list_data)

    return response

@lists_routes.route('/user/<int:userId>')
@login_required
def get_lists_by_userId(userId):
    userLists = List.query.filter(List.user_id == userId).all()
    response = {
        "Lists": {
            "byId": [],
            "allLists": []
        }
    }
    if not userLists:
        response = jsonify({"error": "This user doesn't have any lists yet"})
        response.status_code = 404
        return response

    for lst in userLists:
        list_data = lst.to_dict()
        if not list_data['private']:
            response['Lists']["byId"].append(list_data["listId"])
            response['Lists']["allLists"].append(list_data)

    return response
