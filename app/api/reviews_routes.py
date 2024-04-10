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
        buyerItem = Item.query.get(review_data['buyerItemId']).to_dict()
        sellerItem = Item.query.get(review_data['sellerItemId']).to_dict()
        # if sellerItem
        trade = Trade.query.get(review_data['tradeId']).to_dict()
        response['Reviews']['byId'].append(review_data['reviewId'])
        response['Reviews']['allReviews'].append(review_data)

    return response
