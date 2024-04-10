from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import List, Item, User, Image, db
from app.models.list_item import ListItem
from ..forms import CreateListForm

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

    if lst['private'] and lst['userId'] != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403


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

@lists_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_list():

    form = CreateListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        private = form.private.data

        new_list = List(
            user_id = current_user.id,
            name = name,
            private = private,
            )
        db.session.add(new_list)
        db.session.commit()
        return jsonify({"message": "Item successfully created."}), 201

    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    return jsonify(error_response), 400

    return render_template('create_list.html', form=form)

@lists_routes.route('/<int:listId>/delete', methods=['DELETE'])
@login_required
def delete_list(listId):
    lst = List.query.get(listId)
    list_data = lst.to_dict()

    if not lst:
        response = jsonify({"error": "List couldn't be found"})
        response.status_code = 404
        return response

    if list_data['userId'] != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403

    db.session.delete(lst)
    db.session.commit()
    return jsonify({"message": "List Successfully Deleted"})
