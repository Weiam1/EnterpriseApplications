# Architecture Overview (Backend)

## Project Goal
This backend is a Spring Boot proof-of-concept for an equipment rental platform.  
Authenticated users can browse products by category, add items to a cart (with period), and confirm an order via checkout.

## Layered Structure
The backend follows a classic layered architecture:

- Controller layer: exposes REST endpoints under `/api/**`
- Service layer: contains the business logic (cart rules, checkout conversion, etc.)
- Repository layer: database access via Spring Data JPA
- Model layer: JPA entities that represent the domain (User, Product, Cart, Order, ...)

## Core Domain Entities
- User  
  Represents a registered student. Used as principal in Spring Security.

- Category / Product  
  Products belong to categorize. Products are shown in the catalog and filtered by category.

- Cart / CartItem  
  Each user has one cart. A cart contains multiple cart items.  
  Each CartItem contains:
    - product
    - quantity
    - priceAtThatTime (price snapshot when added)
    - startDate + endDate (rental period)

- Order / OrderItem  
  An Order is created during checkout and is linked to the authenticated user.  
  An Order contains multiple OrderItems copied from the cart.

## Key Design Decisions
### 1) Layered separation (Controller → Service → Repository)
Business rules are implemented in services to keep controllers thin and testable.

### 2) priceAtThatTime in CartItem
We store a price snapshot to prevent inconsistencies if the product price changes later.

### 3) Period stored per CartItem
The rental period (startDate, endDate) is stored in CartItem so a user can rent the same product for different periods.

### 4) Orders are linked to the authenticated user
Orders are created from the authenticated session to ensure data integrity and prevent orders being created for another user.
