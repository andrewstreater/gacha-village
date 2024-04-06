Table User {
  id integer [pk, increment]
  firstName varchar [not null]
  lastName varchar [not null]
  username varchar [not null, unique]
  hashedPassword varchar [not null]
  email varchar [not null, unique]
  image_id integer
  createdAt timestamp
  updatedAt timestamp
}

Table Item {
  id integer [pk, increment]
  owner_id integer [not null]
  title varchar [not null]
  brand varchar [not null]
  series varchar
  model varchar
  release_date integer
  edition varchar
  condition varchar [not null]
  description varchar [not null]
  is_tradable boolean
  createdAt timestamp
  updatedAt timestamp
}

Table List {
  id integer [pk, increment]
  name varchar [not null]
  user_id integer [not null]
  private boolean
}

Table Post {
  id integer [pk, increment]
  user_id integer [not null]
  title varchar [not null]
  body varchar [not null]
  image_id integer
  createdAt timestamp
  updatedAt timestamp
}

Table Comment {
  id integer [pk, increment]
  user_id integer [not null]
  post_id integer [not null]
  image_id integer
  title varchar [not null]
  body varchar [not null]
  createdAt timestamp
  updatedAt timestamp
}

Table Like {
  id integer [pk, increment]
  user_id integer [not null]
  likable_type varchar [not null]
  likable_id integer [not null]
}

Table Trade {
  id integer [pk, increment]
  buyer_item_id integer [not null]
  seller_item_id integer [not null]
  status varchar [not null]
  createdAt timestamp
  updatedAt timestamp
}

Table Review {
  id int [pk, increment]
  trade_id integer [not null]
  userId integer [not null]
  review varchar [not null]
  stars int [not null]
  createdAt timestamp
  updatedAt timestamp
}

Table Image {
  id int [pk, increment]
  imageable_type varchar [not null]
  imageable_id integer [not null]
  preview boolean [not null]
}

Table ListItem {
  id int [pk, increment]
  list_id integer [not null]
  item_id integer [not null]
}

Ref: User.image_id > Image.id
Ref: Item.owner_id > User.id
Ref: Trade.buyer_item_id > Item.id
Ref: Trade.seller_item_id > Item.id
Ref: Review.trade_id > Trade.id
Ref: List.user_id > User.id
Ref: List.item_id > Item.id
Ref: ListItem.item_id > Item.id
Ref: ListItem.list_id > List.id
// Ref: Post.user_id > User.id
// Ref: Post.image_id > Image.id
// Ref: Comment.user_id > User.id
// Ref: Comment.image_id > Image.id
// Ref: Like.user_id > User.id
// Ref: Like.likable_id > Comment.id
// Ref: Like.likable_id > Post.id
Ref: Image.imageable_id > User.id
Ref: Image.imageable_id > Item.id
Ref: Image.imageable_id > Review.id
// Ref: Image.imageable_id > Post.id
// Ref: Image.imageable_id > Comment.id
