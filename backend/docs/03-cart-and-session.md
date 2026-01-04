# 03 – Cart & Session Management

## Cart Concept
Each authenticated user has exactly one cart.  
The cart is created automatically the first time the user interacts with it.

The cart is not session-based on the frontend, but user-based on the backend and linked to the authenticated user.

## Cart Structure
- Cart  
  Represents the shopping cart of a user.
  Each cart is linked to exactly one user.

- CartItem  
  Represents one rented product inside the cart.
  A cart can contain multiple CartItems.

Each CartItem contains:
- product
- quantity
- priceAtThatTime
- startDate
- endDate

## Adding Items to the Cart
When a product is added to the cart:
- The backend checks if the user already has a cart.
- If no cart exists, a new one is created.
- If the same product is added with the same rental period, the quantity is increased.
- If the same product is added with a different rental period, a new CartItem is created.

This allows renting the same product multiple times for different periods.

## Price Snapshot
The field `priceAtThatTime` is stored in CartItem.
This ensures:
- The price remains consistent even if the product price changes later.
- Checkout and orders always reflect the original agreed price.

## Quantity Management
- Quantities can be updated directly from the cart.
- If the quantity is reduced to zero or below, the CartItem is removed.
- Users can also explicitly remove a CartItem from the cart.

## Cart Clearing
After a successful checkout:
- All CartItems are removed from the cart.
- The cart itself remains linked to the user for future use.

## Design Decisions
- Cart is linked to the authenticated user, not to a browser session.
- Business logic is implemented in the service layer (`CartServiceImpl`).
- Controllers only delegate requests and return responses.
- Period-based cart items allow flexible rental scenarios.
