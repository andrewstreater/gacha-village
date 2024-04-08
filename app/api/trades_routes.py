from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Trade, Item, User, Image, db
# from ..forms import

trades_routes = Blueprint('trades', __name__)

@trades_routes.route('/current')
@login_required
def get_all_trades_of_current_user():
    allTrades = Trade.query.all()
    response = {
        'asBuyer': {},
        'asSeller': {}
    }

    for trade in allTrades:
        trade_data = trade.to_dict()

        buyerItemId = trade_data['buyerItemId']
        buyerItem = Item.query.get(buyerItemId)
        if (buyerItem.owner_id == current_user.id):
            response['asBuyer'][f'trade{trade.id}'] = trade_data

        sellerItemId = trade_data['sellerItemId']
        sellerItem = Item.query.get(sellerItemId)
        if (sellerItem.owner_id == current_user.id):
            response['asSeller'][f'trade{trade.id}'] = trade_data

    return response


@trades_routes.route('/<int:trade_id>', methods=['GET', 'PUT'])
def get_trade(trade_id):
    trade = Trade.query.get(trade_id)

    if not trade:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response

    # if request.method in ["PUT"]:
    #     if current_user.is_authenticated and item.owner_id == current_user.id:
    #         pass
    #     else:
    #         return jsonify({"error": "Unauthorized access"}), 403

    if request.method == 'GET':
        trade_data = trade.to_dict()

        buyerItemId = trade_data['buyerItemId']
        buyerItem = Item.query.get(buyerItemId).to_dict()
        buyerId = buyerItem['ownerId']
        buyer = User.query.get(buyerId).to_dict()
        buyerItemImages = Image.query.filter(Image.imageable_id == buyerItemId).all()
        buyerItemPreview = [image.to_dict() for image in buyerItemImages if image.preview]
        buyerItems = {**buyerItem, 'previewImage': buyerItemPreview}

        sellerItemId = trade_data['sellerItemId']
        sellerItem = Item.query.get(sellerItemId).to_dict()
        sellerId = sellerItem['ownerId']
        seller = User.query.get(sellerId).to_dict()
        sellerItemImages = Image.query.filter(Image.imageable_id == sellerItemId).all()
        sellerItemPreview = [image.to_dict() for image in buyerItemImages if image.preview]
        sellerItems = {**sellerItem, 'previewImage': sellerItemPreview}

        trade_data['Buyer'] = {**buyer, 'Item': buyerItems}
        trade_data['Seller'] = {**seller, 'Item': sellerItems}

        return trade_data
