from flask import Blueprint, request, jsonify, render_template, redirect
from flask_login import current_user, login_required
from app.models import Item, User, Image, db
from ..forms import CreateItemForm, AddImageForm

items_routes = Blueprint('items', __name__)

@items_routes.route('/')
def get_all_items():
    items = Item.query.all()
    response = {
        'byId': []
    }

    for item in items:
        item_data = item.to_dict()
        itemId = item_data['itemId']

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        response[f'{itemId}'] = item_data
        response['byId'].append(itemId)

    return response

@items_routes.route('/<int:item_id>', methods=['GET', 'PUT'])
def get_item(item_id):
    item = Item.query.get(item_id)

    if not item:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response

    if request.method in ["PUT"]:
        if current_user.is_authenticated and item.owner_id == current_user.id:
            pass
        else:
            return jsonify({"error": "Unauthorized access"}), 403

    if request.method == 'GET':
        item_data = item.to_dict()

        itemImages = Image.query.filter(Image.imageable_id == item_data['itemId']).all()
        return {**item.to_dict(), 'itemImages': [image.to_dict() for image in itemImages]}

    if request.method == "PUT":
        form = CreateItemForm(obj=item)

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            item.title = form.title.data
            item.brand = form.brand.data
            item.series = form.series.data
            item.model = form.model.data
            item.release_date = form.release_date.data
            item.edition = form.edition.data
            item.condition = form.condition.data
            item.description = form.description.data
            item.is_tradable = form.is_tradable.data

            db.session.commit()
            return jsonify({"message": "Item has been updated successfully"}), 201
        else:
            error_messages = {}
            for field, errors in form.errors.items():
                error_messages[field] = errors[0]

            response = jsonify({
                "message": "Bad Request",
                "error": error_messages,
            })
            response.status_code = 400
            print("--------LINE 77: ", form.errors)
            return response


@items_routes.route('/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get(item_id)

    if not item:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response

    if current_user.is_authenticated and item.owner_id == current_user.id:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item Successfully Deleted"})
    else:
        return jsonify({"error": "Unauthorized access"}), 403


@items_routes.route('/current')
@login_required
def get_items_by_current_user():
    items = Item.query.filter(Item.owner_id == current_user.id).all()
    response = {
        'byId': []
    }

    for item in items:
        item_data = item.to_dict()
        itemId = item_data.pop('itemId')

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        response[f'item{itemId}'] = item_data
        response['byId'].append(itemId)

    return response

@items_routes.route('/user/<int:user_id>')
@login_required
def get_items_by_userId(user_id):
    items = Item.query.filter(Item.owner_id == user_id).all()
    response = {
        'byId': []
    }

    for item in items:
        item_data = item.to_dict()
        itemId = item_data.pop('itemId')

        previewImage = Image.query.filter(Image.imageable_id == itemId).all()

        if previewImage and previewImage[0].to_dict()['preview']:
            item_data['previewImage'] = previewImage[0].to_dict()

        response[f'item{itemId}'] = item_data
        response['byId'].append(itemId)

    return response

@items_routes.route('/<int:item_id>/images/new', methods=['GET', 'POST'])
@login_required
def add_image_to_item(item_id):

    item = Item.query.get(item_id)

    if not item:
        response = jsonify({"error": "Item couldn't be found"})
        response.status_code = 404
        return response

    if current_user.is_authenticated and item.owner_id == current_user.id:
        form = AddImageForm()

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            preview = form.preview.data
            image_url = form.image_url.data


        new_image = Image(
            imageable_id = item.id,
            imageable_type = "item",
            preview = preview,
            image_url = image_url
            )
        db.session.add(new_image)
        db.session.commit()
        return jsonify({"message": "Image was successfully added to Item."}), 201
    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    return jsonify(error_response), 400

    return render_template('add_item.html', form=form)


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
        release_date = form.release_date.data
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
    errors = {}
    for field, error in form.errors.items():
        field_obj = getattr(form, field)
        errors[field_obj.label.text] = error[0]
    error_response = {
        "message": "Body validation errors",
        "error": errors
    }
    print('------------------LINE 225', form.errors)
    return jsonify(error_response), 400

    return render_template('create_item.html', form=form)
