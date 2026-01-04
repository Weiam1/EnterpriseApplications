# Checkout & Orders Flow (Frontend)

## Purpose
This document explains how the checkout process and order history
are handled on the frontend, from confirming a cart to viewing past orders.

---

## Checkout Page Overview
The Checkout page is the final step before confirming an order.

Main responsibilities:
- Allow the user to confirm their current cart
- Trigger order creation on the backend
- Show a clear confirmation result

The page does not perform any business logic itself.

---

## Checkout Flow
1. User navigates to the Checkout page from the Cart
2. User clicks “Confirm Order”
3. Frontend sends a POST request to `/api/checkout`
4. Backend:
    - Converts cart items into an order
    - Clears the cart
    - Returns order confirmation data
5. Frontend displays a confirmation screen

---

## Loading & Feedback Handling
During checkout:
- The confirm button is disabled
- A loading state is shown (“Processing…”)

This prevents:
- Double submissions
- Accidental duplicate orders

---

## Order Confirmation Screen
After a successful checkout:
- A centered confirmation card is shown
- The following information is displayed:
    - Order ID
    - Total price
- Two clear actions are provided:
    - “View My Orders”
    - “Back Home”

No browser alerts or popups are used.

---

## Orders Page Overview
The Orders page displays the user’s confirmed orders.

Behavior:
- Orders are fetched from `/api/orders`
- Only orders belonging to the authenticated user are returned
- Orders are shown in reverse chronological order

---

## Orders Display
For each order, the frontend displays:
- Order ID
- Creation date
- Total price
- List of ordered products:
    - Product name
    - Quantity
    - Price per item

This gives users full transparency over their past reservations.

---

## Authentication Dependency
- The Orders page is only accessible for authenticated users
- JWT authentication ensures users only see their own orders
- Unauthorized access is blocked by the backend

---

## Navigation Integration
- After checkout, users can directly navigate to the Orders page
- The Navbar includes an “Orders” button for quick access
- This creates a natural user flow from cart → checkout → order history

---

## Design Considerations
- Checkout is intentionally simple (proof-of-concept)
- All validations and conversions are handled server-side
- Frontend focuses on clarity and user feedback
- UI consistency is maintained across cart, checkout, and orders

---

## Summary
The checkout and orders flow provides a clear and secure way for users
to confirm their rentals and review past orders, while keeping the frontend
logic minimal and maintainable.
