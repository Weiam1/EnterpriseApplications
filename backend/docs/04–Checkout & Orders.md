# 04 – Checkout & Orders

## Checkout Flow
Checkout is the process that converts the current cart into a confirmed order.

Only authenticated users can perform a checkout.  
The checkout operation is triggered via the `/api/checkout` endpoint.

## Checkout Process (Backend)
When a user confirms the checkout, the following steps occur:

1. The authenticated user is retrieved from the SecurityContext.
2. The cart linked to this user is loaded from the database.
3. The system validates that the cart exists and is not empty.
4. A new Order entity is created and linked to the user.
5. Each CartItem is converted into an OrderItem.
6. The total price of the order is calculated.
7. The cart is cleared after successful order creation.
8. A CheckoutResponse is returned to the frontend.

## Order Structure
- Order  
  Represents a confirmed rental order.
  Each order is linked to exactly one authenticated user.

  Fields:
    - user
    - createdAt
    - totalPrice
    - items

- OrderItem  
  Represents one product inside an order.
  OrderItems are immutable snapshots of the cart at checkout time.

  Fields:
    - product
    - quantity
    - price

## Price Consistency
The price stored in OrderItem is calculated at checkout time.
This ensures:
- Orders are not affected by future product price changes.
- The order reflects the exact agreement at the time of confirmation.

## Order Creation Responsibility
There are two dedicated services:
- CheckoutService  
  Responsible for converting a cart into an order and clearing the cart.

- OrderService  
  Responsible for retrieving orders for a specific user.

This separation keeps responsibilities clear and avoids duplicated logic.

## Order Retrieval
Users can retrieve all their confirmed orders via `/api/orders`.

The response is mapped to an OrderResponse DTO that contains:
- orderId
- createdAt
- totalPrice
- list of ordered products (name, quantity, price)

This ensures:
- Users can only see their own orders.
- Sensitive internal fields are not exposed.

## Design Decisions
- Orders are always linked to the authenticated user.
- Cart data is never reused after checkout.
- DTOs are used to control API responses.
- Checkout logic is transactional to guarantee data consistency.
