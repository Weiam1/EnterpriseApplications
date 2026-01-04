# 05 – Design Decisions

## Purpose of This Document
This document explains the **most important design decisions** made during the development of the backend.  
It focuses on *why* certain choices were made, not *how* the code works line by line.

Only decisions that influence **architecture, security, or data integrity** are documented here.

---

## Decision 1 – Layered Architecture (Controller / Service / Repository)

### Decision
The backend follows a strict layered architecture:
- Controller layer for HTTP requests
- Service layer for business logic
- Repository layer for database access

### Reasoning
This separation ensures:
- Clear responsibility per layer
- Easier testing and debugging
- Controllers remain thin and readable
- Business rules are centralized in services

### Alternative Considered
Placing business logic directly in controllers.

### Why It Was Rejected
This would lead to:
- Large, unmaintainable controllers
- Duplicated logic
- Difficult testing

---

## Decision 2 – JWT Authentication (Stateless Security)

### Decision
JWT (JSON Web Tokens) is used for authentication instead of session-based login.

### Reasoning
- Frontend and backend are separated
- Stateless authentication fits REST architecture
- No server-side session storage needed
- Token can be easily attached to each request

### Security Measures
- Passwords are hashed using BCrypt
- Tokens have an expiration time
- Tokens are validated on every secured request

### Alternative Considered
Spring Security sessions or OAuth providers.

### Why It Was Rejected
- Sessions require server-side state
- OAuth was considered too complex for a proof-of-concept

---

## Decision 3 – CartItem as Separate Entity

### Decision
A cart contains **CartItem entities** instead of storing products directly.

### Reasoning
Each cart item needs its own:
- Quantity
- Price snapshot
- Rental period (startDate, endDate)

This information cannot be stored in Product itself.

### Alternative Considered
Storing a simple list of products in the cart.

### Why It Was Rejected
- No way to store quantity or period per product
- No flexibility for future extensions

---

## Decision 4 – Price Snapshot (priceAtThatTime)

### Decision
The product price is copied into CartItem as `priceAtThatTime`.

### Reasoning
- Product prices may change over time
- Orders must reflect the price at the moment of renting
- Prevents incorrect totals when prices are updated later

### Alternative Considered
Always using the current product price.

### Why It Was Rejected
This would cause historical orders to change value retroactively.

---

## Decision 5 – Rental Period Stored per CartItem

### Decision
The rental period (startDate, endDate) is stored in CartItem, not in Cart or Order.

### Reasoning
- Same product can be rented multiple times with different periods
- Period is specific to a single product selection
- Allows future availability checks per product

### Alternative Considered
Storing one global period per cart.

### Why It Was Rejected
This would restrict renting different products for different periods.

---

## Decision 6 – Orders Linked to Authenticated User

### Decision
Orders are linked using a `@ManyToOne` relationship to the User entity.

### Reasoning
- Guarantees ownership of orders
- Prevents users from accessing other users’ orders
- Matches real-world business logic

### Alternative Considered
Storing only userId as a primitive field.

### Why It Was Rejected
- No JPA relationship
- Harder querying
- Less expressive domain model

---

## Decision 7 – Checkout Converts Cart → Order

### Decision
During checkout:
- CartItems are converted into OrderItems
- Cart is cleared after successful checkout

### Reasoning
- Cart is temporary
- Order represents a confirmed, immutable transaction
- Clean separation between “draft” and “final” data

### Alternative Considered
Reusing Cart as Order.

### Why It Was Rejected
- Cart remains mutable
- Orders must be immutable after confirmation

---

## Conclusion
All design decisions were made with the following priorities:
- Clear separation of responsibilities
- Data integrity
- Security
- Future extensibility
- Alignment with Spring Boot best practices

This design ensures the application is maintainable, secure, and suitable as a proof-of-concept for an equipment rental platform.
