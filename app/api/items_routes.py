from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Item, User, Image, db

items_routes = Blueprint('items', __name__)

@items_routes.route('/')
def get_all_items():
    items = Item.query.all()
    response = {'Items': {
        'byId': [],
        'allItems': []
    }}

    print(items)

    for item in items:
        item_data = item.to_dict()
        itemId = item_data.pop('itemId')

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()
        print('-----------------Line 23: ', previewImage)

        if previewImage:
            item_data['previewImage'] = previewImage[0].to_dict()

        item_data_at_key = dict({f'item{itemId}': item_data})


        print("HITT!!!!", previewImage)

        # tracks = Track.query.join(PlaylistsTracks).filter(PlaylistsTracks.columns.playlist_id == playlist_id).all()

        response['Items']['allItems'].append(item_data_at_key)
        # response['Items']['allItems'][f'{itemId}'] = item_data
        response['Items']['byId'].append(itemId)

    return response

@items_routes.route('/<int:item_id>', methods=['GET', 'PUT', 'DELETE'])
def get_item(item_id):
    item = Item.query.get(item_id)

    if not item:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response

    if request.method in ["PUT", "DELETE"]:
        if current_user.is_authenticated and item.owner_id == current_user.id:
            pass
        else:
            return jsonify({"error": "Unauthorized access"}), 403

    if request.method == 'GET':
        item_data = item.to_dict()
