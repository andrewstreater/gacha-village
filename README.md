## Welcome to the Gatcha Village wiki!
### Items
* Users should be able to view all Items.
* Users should be able to upload Items for trade.
* Users should be able to update their uploaded Items.
* Users should be able to delete their uploaded Items.
### Wishlists
* Users should be able to view all Wishlists created by users.
* Users should be able to add Items to a Wishlist they created.
* Users should be able to remove Items from their Wishlist.
* Users should be able to delete their Wishlists.
### Trades
* Users should be able to offer a Trade on any available Item
* Users should be able to accept and reject offers made on their items
* Users should be able to delete a Trade offer
* Users should be able to update a Trade offer
### Reviews
* Users should be able to Create a Review for trades they have made.
* Users should be able to Update a Review they've created.
* Users should be able to Delete a Review they've created.
### Search
* Users should be able to search for Items by Brand, Series, or Model
* Users should be able to view the results of their search.


## User Stories

### Login & Sign Up
* On the top right corner of the page, there should be a signup/login button.
* As a new user, I want to signup for an account so that I can access the feature of the platform.
* As a new user when clicking the signup button for I want to see a modal that pops up in the center of the page that gives me fields to enter a username, email, password, confirm password fields on the form.
* As an existing user when clicking the login button I want to see a modal that pops up in the center of the page that gives me fields to enter my email and password.
* As a user, I want the login/signup process to include password strength requirements and validation to ensure the security of my account. I want errors to show up in red above the form field that is violating the requirements.
* After successful login/sign up, the login/signup button should be replaced with my user icon, and the modal should close and the page should refresh to display the home page.

### Homepage
* As a user I should see a all items available for trade on the home page in a tile view. Each tile is clickable and should take you to that item's display page.
* I should also see tiles for popular categories/series that take me to a page showing only items in those categories.
* On the top left of the screen, I should see a website logo
* If I am logged in, I should see a button to right of the website logo that reads "List an Item", which will take me to the "List an Item" page
* On the left hand side of the screen, there should be a column with NavLinks to "All items", "Categories", "Home", "Community" (coming soon).
* On the right hand profile icon, i should be able to click on the icon and see links to "My Profile", "My Listings", "Trades", "Wishlist", and a "Logout" button.
* If I have new trade offers or if anyther user has accepted my off, I should see a red notification dot beside the "Trades" navlink.

### My Profile Page
* Should display my username, profile pic, banner, bio, Avg rating, number of trades, and "member since xx/xx/xxxx"
* I should see a tile view of all my items, with edit and delete buttons.

### User Profile
* Should display the user's username, profile pic, banner, bio, Avg rating, number of trades, and "member since xx/xx/xxxx"
* I should see a clickable tile view of all the user's items that will route to the item detail page.
* You should be able to view another users wishlist.

### Items
* On the home page, users should be able to view all items available for trade in a tile view.
* Each item tile should be a clickable link that takes you to the item's display page.

#### Item display page
* The items display page should show you the item's images, brand, series, model, edtion (if applicable).
* at the top of the items diaplay page, there should be a "Make an Offer" button, that will open up a modal with a list of the user's items that they have uploaded to the site. There should also be a "Add item to offer" button which takes the user to a "Create an Item" page.
* The item display page will also show a "Star" button that will allow you to add the item to your wishlist.
* If I am the owner of the item, i should see a additional "Edit Listing" button on the item page.

### Create an Item
* Once pressing the 'List an Item' button on the home page, I should be redirected to a form. This form will have the following elements: brand, series, model, year, edition, weight, dimensions.
* Once the user presses submit and all form validations pass, the page will redirect to the newly created Listing's page
* If the form errors, then the page will not redirect but the error messages will populate at under the fields that failed validation

### Wishlists
* Users should be able to add an item to their wishlist from any item display page for items they do not own.
Users should also be able to add an item from any item tile view for items they do not own.


### Trades
* Once clicking on the "Make an Offer" button, a form modal will open with a list of the user's items that they have uploaded to the site.
* Users should be able to select multiple items to offer.
* There should be a submit button at the bottom on the modal to submit the trade.
#### Trade statuses: Open, Closed Rejected, Accepted, Pending, Closed
* Open: When an offer is made, a new Trade instance will be created with the status set to "Open"
    - The sender of the offer will see the offer on their My Trades page under the Sent Offers tab, with a tag showing the trade's Open status
    - The receipient of the offer will see the offer on their My Trades page under the Received offers tab, with a tag showing the trade's Openn status
* Closed Rejected: the recipient of the offer rejects the offer
    - Both sender and receipient will see Closed Rejected offers in their My Trades page under the Closed offers tab, with a tag showing the trade's Rejected status
* Accpeted: the recipient of the offer accepts the offer
    - Both sender and receipient will see Accepted offers in their My Trades page under the Accepted offers tab, with a tag showing the trade's Accepted status
* Pending: one or both members have sent the items, but not both of them have received the items.
    - Both sender and receipient will see Pending offers in their My Trades page under the Accepted offers tab, with a tag showing the trade's Pending status
    - Sub Tiles will show "Shipped" or "Not Shipped" next to the items in the trade as Appropriate
* Closed: Items within accepted offers have been shipped and received by both parties
    - Both sender and receipient will see Closed offers in their My Trades page under the Trade History tab, with a tag showing the trade's closed status

### My Trades Page
* The My Trades page should have sections showing Sent Offers, Received Offers, Accepted Trades, and Trade History.
* Each item on the trade list of each category of trade will show an icon of the items offered with and arrow pointing to the items the offer was made on. There will be a tag showing the offer's status on the right side of the list.
* Pending trades ... (one or both items have shipped), Rejected, or Closed (closed trades become closed after both parties have reveiced the item).
* Trades that are in a Closed status and are not older that 60 days should have a review button beside them.

### Receiving Trade
* Clicking on the offer in the "Trades page", should take you to the offer page. This page should show you the items being offered for the your item that the offer was made on.
* There should be an "Accept Offer" button, which will change the Trade status to "Accepted"
* There should be an "Reject Offer" button, which will change the Trade status to "Rejected"
* There should be a "Make a Counter Offer" button, which will keep the Trade in an "Open" status, and send the updated trade to the other user.

### Reviews
* Users should be able to create reviews on the Trades page in their profile. Reviews should only be able to be left on trades that are closed and not older then 60 days.
* The review form should show a text area for "Review" and a star rating section, and a submit button at the bottom.
