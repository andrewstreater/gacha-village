from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Trade, Item, User, Image, db
# from ..forms import

trades_routes = Blueprint('trades', __name__)

@trades_routes.route('/current')
@login_required
def get_all_trades_of_current_user():
    allTrades = Trade.query.all()
    response = []

    for trade in allTrades:
        trade_data = trade.to_dict()

        buyerItemId = trade_data['buyerItemId']
        buyerItem = Item.query.get(buyerItemId)
        if (buyerItem.owner_id == current_user.id):
            response.append(trade_data)

        sellerItemId = trade_data['sellerItemId']
        sellerItem = Item.query.get(sellerItemId)
        if (sellerItem.owner_id == current_user.id):
            response.append(trade_data)

    return response


@trades_routes.route('/<int:trade_id>', methods=['GET'])
def get_trade(trade_id):
    trade = Trade.query.get(trade_id)

    if not trade:
        response = jsonify({"error": "Trade couldn't be found"})
        response.status_code = 404
        return response



    if request.method in ["PUT"]:
        if current_user.is_authenticated:
            pass
        else:
            return jsonify({"error": "Unauthorized access"}), 403

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

@trades_routes.route('/new', methods=['POST'])
@login_required
def create_trade():
    buyerItemId = request.json['buyerItemId']
    sellerItemId = request.json['sellerItemId']

    buyerItem = Item.query.get(buyerItemId)
    sellerItem = Item.query.get(sellerItemId)

    # Error response if item does not exist
    if not buyerItem or not sellerItem:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response
    if not buyerItem.is_tradable or not sellerItem.is_tradable:
        response = jsonify({"error": "One or more items is not tradeable"})
        response.status_code = 403
        return response

    # Error response if identical trade already exists
    existingTrades = Trade.query.all()
    for trade in existingTrades:
        trade_data = trade.to_dict()
        if trade_data["sellerItemId"] == sellerItemId and trade_data["buyerItemId"] == buyerItemId and not trade_data['status'] == 'closed-rejected':
            response = jsonify({"error": "This trade already exists"})
            response.status_code = 403
            return response
        if trade_data["sellerItemId"] == buyerItemId and trade_data["buyerItemId"] == sellerItemId and not trade_data['status'] == 'closed-rejected':
            response = jsonify({"error": "This trade already exists"})
            response.status_code = 403
            return response

    new_trade = Trade(
        buyer_item_id = buyerItemId,
        seller_item_id =  sellerItemId
    )
    db.session.add(new_trade)
    db.session.commit()
    return jsonify({"message": "Trade was successfully created."}), 201


@trades_routes.route('/<int:trade_id>', methods=['PUT'])
def update_trade(trade_id):
    trade = Trade.query.get(trade_id)
    print('-----------------LINE 118', trade.to_dict())
    # Error if Trade not found
    if not trade:
        response = jsonify({"error": "Trade couldn't be found"})
        response.status_code = 404
        return response

    trade_data = trade.to_dict()
    buyerItem = Item.query.get(trade_data['buyerItemId']).to_dict()
    sellerItem = Item.query.get(trade_data['sellerItemId']).to_dict()

    if buyerItem['ownerId'] != current_user.id and sellerItem['ownerId'] != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403

    if trade_data['status'] == 'closed-accepted':
        response = jsonify({"error": "You cannot modify completed trades"})
        response.status_code = 403
        return response

    req = request.json

    # UPDATE TRADE STATUS: accept offers and counter offers
    if trade_data['status'] != req['status'] and req['status'] == 'accepted':
        if current_user.id == sellerItem['ownerId'] and req['status'] == 'accepted':
            trade.status = 'accepted'
            db.session.commit()
            return jsonify({"message": "Trade has been accepted"}), 201
        if current_user.id == buyerItem['ownerId'] and req['status'] == 'counter-offer':
            trade.status = 'accepted'
            db.session.commit()
            return jsonify({"message": "Trade has been accepted"}), 201

    # UPDATE ITEMS IN TRADE

    reqBuyerItem = Item.query.get(request.json['buyerItemId'])
    reqSellerItem = Item.query.get(request.json['sellerItemId'])

    # Error response if new item does not exist
    if not reqBuyerItem or not reqSellerItem:
        response = jsonify({"error": "One or more items couldn't be found"})
        response.status_code = 404
        return response
    if not reqBuyerItem.is_tradable or not reqSellerItem.is_tradable:
        response = jsonify({"error": "One or more items is not tradeable"})
        response.status_code = 403
        return response

    # Error response if identical trade already exists
    existingTrades = Trade.query.all()
    for trade in existingTrades:
        trade_data = trade.to_dict()
        if trade_data["sellerItemId"] == reqSellerItem and trade_data["buyerItemId"] == reqBuyerItem and not trade_data['status'] == 'closed-rejected':
            response = jsonify({"error": "This trade already exists"})
            response.status_code = 403
            return response
        if trade_data["sellerItemId"] == reqBuyerItem and trade_data["buyerItemId"] == reqSellerItem and not trade_data['status'] == 'closed-rejected':
            response = jsonify({"error": "This trade already exists"})
            response.status_code = 403
            return response
    # ----------------------------------------------------------------

    if current_user.id == sellerItem['ownerId'] and req['status'] == 'open':
        trade.buyer_item_id = request.json['buyerItemId']
        trade.seller_item_id = request.json['sellerItemId']
        trade.status = 'counter-offer'

    if current_user.id == buyerItem['ownerId'] and req['status'] == 'counter-offer':
        trade.buyer_item_id = request.json['buyerItemId']
        trade.seller_item_id = request.json['sellerItemId']
        trade.status = 'open'
    db.session.commit()
    return jsonify({"message": "Trade was successfully updated."}), 201
    # return jsonify(trade_data)



@trades_routes.route('/<int:trade_id>/delete', methods=['DELETE'])
@login_required
def delete_trade(trade_id):
    trade = Trade.query.get(trade_id)

    if not trade:
        response = jsonify({"error": "Trade couldn't be found"})
        response.status_code = 404
        return response

    trade_data = trade.to_dict()

    buyerItemId = trade_data['buyerItemId']
    buyerItem = Item.query.get(buyerItemId).to_dict()

    sellerItemId = trade_data['sellerItemId']
    sellerItem = Item.query.get(sellerItemId).to_dict()

    if buyerItem['ownerId'] != current_user.id and sellerItem['ownerId'] != current_user.id:
        return jsonify({"error": "Unauthorized access"}), 403

    if trade_data['status'] == 'closed-accepted':
        response = jsonify({"error": "You cannot delete completed trades"})
        response.status_code = 403
        return response

    db.session.delete(trade)
    db.session.commit()
    return jsonify({"message": "Trade Successfully Deleted"})

# TO DO:
# complete update trade
