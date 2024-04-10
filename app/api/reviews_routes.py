from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Review, Trade, Item, User, Image, db

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/by/current')
@login_required
def get_reviews_by_current_user():
    reviews = Review.query.filter(Review.user_id == current_user.id)
    response = {'Reviews': {
        'byId': [],
        'allReviews': []
    }}

    if not reviews:
            response = jsonify({"error": "You haven't left any review yet"})
            response.status_code = 404
            return response

    for review in reviews:
        review_data = review.to_dict()
        trade = Trade.query.get(review_data['tradeId'])
        response['Reviews']['byId'].append(review_data['reviewId'])
        response['Reviews']['allReviews'].append(review_data)

    return response

@reviews_routes.route('/current')
@login_required
def get_reviews_of_current_user():
    reviews = Review.query.all()
    response = {'Reviews': {
        'byId': [],
        'allReviews': []
    }}

    if not reviews:
            response = jsonify({"error": "You haven't left any review yet"})
            response.status_code = 404
            return response

    for review in reviews:
        review_data = review.to_dict()
        trade = Trade.query.get(review_data['tradeId']).to_dict()
        buyerItem = Item.query.get(trade['buyerItemId']).to_dict()
        sellerItem = Item.query.get(trade['sellerItemId']).to_dict()
        if buyerItem['ownerId'] == current_user.id or sellerItem['ownerId'] == current_user.id:
            if review_data['userId'] != current_user.id:
                response['Reviews']['byId'].append(review_data['reviewId'])
                response['Reviews']['allReviews'].append(review_data)

    return response

@reviews_routes.route('/new/trade/<int:tradeId>', methods=['GET', 'POST'])
@login_required
def create_review(tradeId):
    trade = Trade.query.get(tradeId)

    # Error if Trade not found
    if not trade:
        response = jsonify({"error": "Trade couldn't be found"})
        response.status_code = 404
        return response

    trade = trade.to_dict()

    buyerItem = Item.query.get(trade['buyerItemId']).to_dict()
    sellerItem = Item.query.get(trade['sellerItemId']).to_dict()

    if buyerItem['ownerId'] != current_user.id and sellerItem['ownerId'] != current_user.id:
        response = jsonify({"error": "Unauthorized access"})
        response.status_code = 403
        return response

    existingReview = Review.query.filter(Review.trade_id == trade['tradeId']).all()

    if existingReview:
        for review in existingReview:
            if review.to_dict()['userId'] == current_user.id:
                response = jsonify({"error": "You already left a review for this Trade"})
                response.status_code = 403
                return response

    review = request.json['review']
    stars = request.json['stars']

    new_review = Review(
        trade_id = tradeId,
        user_id = current_user.id,
        review = review,
        stars = stars
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review successfully created."}), 201


@reviews_routes.route('/<int:review_id>/delete', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        response = jsonify({"error": "Review couldn't be found"})
        response.status_code = 404
        return response

    if review.to_dict()['userId'] != current_user.id:
        response = jsonify({"error": "Unauthorized access"})
        response.status_code = 403
        return response

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review Successfully Deleted"})
