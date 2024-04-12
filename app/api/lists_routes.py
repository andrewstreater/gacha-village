from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import List, Item, User, Image, db
from app.models.list_item import ListItem
from ..forms import CreateListForm
from sqlalchemy import delete

lists_routes = Blueprint('lists', __name__)

@lists_routes.route('/current')
@login_required
def get_lists_by_current_user():
    userLists = List.query.filter(List.user_id == current_user.id)
    response = {
            "byId": []
    }
    if not userLists:
        response = jsonify({"error": "You don't have any lists yet"})
        response.status_code = 404
        return response

    for lst in userLists:
        list_data = lst.to_dict()
        listId = list_data.pop('listId')
        response[f'item{listId}'] = list_data
        response['byId'].append(listId)

    return response


@lists_routes.route('/user/<int:userId>')
@login_required
def get_lists_by_userId(userId):
    userLists = List.query.filter(List.user_id == userId).all()
    response = {
            "byId": []
    }
    if not userLists:
        response = jsonify({"error": "This user doesn't have any lists yet"})
        response.status_code = 404
        return response

    for lst in userLists:
        list_data = lst.to_dict()
        listId = list_data.pop('listId')
        response[f'item{listId}'] = list_data
        response['byId'].append(listId)

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


@lists_routes.route('/<int:listId>/edit', methods=['GET', 'PUT'])
@login_required
def update_list(listId):

    lst = List.query.get(listId)
    if not lst:
        response = jsonify({"error": "List couldn't be found"})
        response.status_code = 404
        return response

    if lst.to_dict()['userId'] != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403

    form = CreateListForm(obj=lst)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        lst.name = form.name.data
        lst.private = form.private.data
        db.session.commit()
        return jsonify({"message": "Item successfully updated."}), 200

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

# TO DO:
# add item to list
# remove item from list

@lists_routes.route('<int:listId>/items/<int:itemId>', methods=["POST", "DELETE"])
@login_required
def add_remove_item_on_list(listId, itemId):
    """
    Add a track to an existing playlist
    """
    lst = List.query.get(listId)
    item = Item.query.get(itemId)
    if not lst:
        return jsonify({"error": "Playlist not found"}), 404

    if lst.user_id != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403

    if not item:
        return jsonify({"error": "Item not found"}), 404


    if request.method == "POST":

        if item in lst.items:
            return jsonify({"error": "Item is already on this list"}), 400

        add_item_to_list = {"list_id": listId, "item_id": itemId}
        db.session.execute(ListItem.insert(), add_item_to_list)
        db.session.commit()
        message = f'You have successfully added {item.to_dict()["title"]} to {lst.to_dict()["name"]}'
        return jsonify({"message": message}), 201

    if request.method == "DELETE":
        remove_item_from_list = delete(ListItem).where(
            ListItem.c.list_id == listId,
            ListItem.c.item_id == itemId
        )

        result = db.session.execute(remove_item_from_list)
        db.session.commit()

        if result.rowcount > 0:
            message = f'You have successfully removed {item.to_dict()["title"]} from {lst.to_dict()["name"]}'
            return jsonify({"message": message}), 200
        else:
            return jsonify({"error": "List couldn't be found"}), 404
