Table User {
  id integer [pk, increment]
  firstName varchar [not null]
  lastName varchar [not null]
  username varchar [not null, unique]
  hashedPassword varchar [not null]
  email varchar [not null, unique]
  createdAt timestamp
  updatedAt timestamp
}

Table Item {
  id integer [pk, increment]
  owner_id integer [not null]
  brand varchar [not null]
  series varchar
  model varchar
  year integer
  edition varchar
  weight float [not null]
  dimensions integer [not null]
  createdAt timestamp
  updatedAt timestamp
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

Ref: Item.owner_id > User.id
Ref: Trade.buyer_item_id > Item.id
Ref: Trade.seller_item_id > Item.id
Ref: Review.trade_id > Trade.id
