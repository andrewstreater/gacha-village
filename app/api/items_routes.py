from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Item, User, Image, db
from ..forms import CreateItemForm

items_routes = Blueprint('items', __name__)

@items_routes.route('/')
def get_all_items():
    items = Item.query.all()
    response = {'Items': {
        'byId': [],
        'allItems': []
    }}

    for item in items:
        item_data = item.to_dict()
        itemId = item_data.pop('itemId')

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        item_data_at_key = dict({f'item{itemId}': item_data})
        response['Items']['allItems'].append(item_data_at_key)
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

        itemImages = Image.query.filter(Image.imageable_id == item_data['itemId']).all()
        return {**item.to_dict(), 'itemImages': [image.to_dict() for image in itemImages]}


@items_routes.route('/current')
@login_required
def get_items_by_current_user():
    items = Item.query.filter(Item.owner_id == current_user.id).all()
    response = {'Items': {
        'byId': [],
        'allItems': []
    }}

    for item in items:
        item_data = item.to_dict()
        itemId = item_data.pop('itemId')

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        item_data_at_key = dict({f'item{itemId}': item_data})
        response['Items']['allItems'].append(item_data_at_key)
        response['Items']['byId'].append(itemId)

    return response

@items_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_item():

    form = CreateItemForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.title.data
        brand = form.brand.data
        series = form.series.data
        model = form.model.data
        release_date = form.releaseDate.data
        edition = form.edition.data
        condition = form.condition.data
        description = form.description.data
        is_tradable = form.is_tradable.data


        new_item = Item(
            owner_id = current_user.id,
            title = title,
            brand = brand,
            series = series,
            model = model,
            release_date = release_date,
            edition = edition,
            condition = condition,
            description = description,
            is_tradable = is_tradable
            )
        db.session.add(new_item)
        db.session.commit()
        return jsonify({"message": "Item successfully created."}), 201
    print("---------LINE 111 FORM ERRORS: ", form.errors)
    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    return jsonify(error_response), 400

    return render_template('create_item.html', form=form)
