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
        item_data_at_key = dict({f'item{itemId}': item_data})

        response['Items']['allItems'].append(item_data_at_key)
        # response['Items']['allItems'][f'{itemId}'] = item_data
        response['Items']['byId'].append(itemId)

    return response
