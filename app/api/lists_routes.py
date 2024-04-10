from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import List, Item, User, Image, db
from app.models.list_item import ListItem

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


@lists_routes.route('/<int:listId>')
@login_required
def get_details_by_listId(listId):
    lst = List.query.get(listId).to_dict()

    if not lst:
        response = jsonify({"error": "List couldn't be found"})
        response.status_code = 404
        return response

    items = Item.query.join(ListItem).filter(ListItem.columns.list_id == listId).all()
    itemsList = []
    for item in items:
        item_data = item.to_dict()

        previewImage = Image.query.filter(Image.imageable_id == item_data['itemId']).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        itemsList.append(item_data)

    return {"List": {
        **lst,
        "Items": itemsList
    }}


# @lists_routes.route('/<int:listId>/delete', methods=['DELETE'])
# @login_required
# def get_lists_by_userId(userId):
