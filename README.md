#  Equipment Rental Platform — Enterprise Applications

##  Project Overview

This project is a **proof-of-concept web application** developed for an arts education institution.
The platform allows **registered students** to browse a catalog of equipment (lighting, cables, control panels, etc.), add items to a cart for a **specific rental period**, and confirm their reservation via a checkout flow.

The goal of this project is to demonstrate **core enterprise web application functionality** using a **Java Spring Boot backend** and a **React frontend**, with a strong focus on security, clean architecture, and maintainability.



 🧱 Technology Stack

 Backend

* Java 21
* Spring Boot
* Spring Security (JWT-based authentication)
* Spring Data JPA (Hibernate)
* MySQL
* Maven

### Frontend

* React (Vite)
* React Router
* Axios
* Material UI (MUI)



##  Project Structure

### Backend (`backend/EnterpriseApplications`)

```
src/main/java/ehb/be/enterpriseapplications
├── config        # Security & application configuration
├── controller    # REST controllers (Products, Cart, Orders, Auth, Checkout)
├── dto           # Data Transfer Objects (API responses)
├── model         # JPA entities (User, Product, Cart, Order, etc.)
├── repository    # Spring Data JPA repositories
├── service       # Business logic interfaces
└── service/impl  # Business logic implementations
```

### Frontend (`frontend/EnterpriseApplications`)

```
src
├── api           # Axios configuration
├── assets        # Static assets
├── auth          # Authentication logic (AuthContext)
├── components    # Reusable UI components (Navbar, Cards)
├── context       # Global contexts (Cart/Auth if applicable)
├── pages         # Application pages (Home, Products, Cart, Checkout, Orders)
├── router        # Application routing
├── theme         # Material UI theme
├── App.jsx
└── main.jsx
```

---

## Implemented Features

### Authentication & Security

* User registration and login
* Secure authentication using **JWT**
* Password hashing with **BCrypt**
* Protected endpoints (only authenticated users can access cart, checkout, orders)

###  Product Catalog

* Display all products
* Filter products by category
* Search products by name
* Each product includes:

  * Price
  * Quantity selector
  * Rental period (start date & end date)

###  Shopping Cart

* Add products with:

  * Quantity
  * Rental period
* Increase or decrease quantity
* Remove single items
* Cart is **user-specific** and stored server-side

### 💳 Checkout

* Confirm order from cart
* Convert cart items into an order
* Cart is cleared after successful checkout
* Custom confirmation screen (no browser popups)

###  Orders

* Orders are linked to the authenticated user
* View all previous orders
* Each order displays:

  * Order ID
  * Date
  * Total price
  * List of ordered products with quantity and price



##  Design Decisions

* **Layered architecture** (Controller → Service → Repository)
* Use of **DTOs** to decouple frontend from persistence layer
* Server-side cart to ensure consistency and security
* Avoided browser alerts in favor of in-app UI feedback
* Simple but extendable rental-period logic per cart item



##  Database Model (Summary)

* **User**

  * One-to-One → Cart
  * One-to-Many → Orders
* **Cart**

  * One-to-Many → CartItems
* **Order**

  * Many-to-One → User
  * One-to-Many → OrderItems
* **Product**

  * Many-to-One → Category

---

##  Assignment Requirements Checklist

| Requirement               | Status |
| ------------------------- | ------ |
| Product catalog           | ✅      |
| Category filtering        | ✅      |
| Search functionality      | ✅      |
| Cart system               | ✅      |
| Checkout flow             | ✅      |
| User registration & login | ✅      |
| Secure authentication     | ✅      |
| Orders linked to user     | ✅      |
| Documentation             | ✅      |
| Clean project structure   | ✅      |



##  References & Resources

* Spring Boot Documentation
  [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
* Spring Security
  [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)
* React Documentation
  [https://react.dev](https://react.dev)
* Material UI
  [https://mui.com](https://mui.com)



## 🤖 AI Usage Disclosure

During the development of this project, AI tools (ChatGPT) were used as a support tool to assist with understanding concepts and improving implementation quality.

The AI was used for:

Clarifying Spring Boot and Spring Security concepts

Verifying architectural decisions (controller–service–repository pattern)

Debugging backend and frontend integration issues

Improving React component structure and state management

Reviewing project requirements and rubric compliance

Example prompts used:

“How to securely link orders to authenticated users in Spring Boot?”

“Best practice for implementing a cart and checkout flow with Spring Boot and React”

“How to structure DTOs for orders and order items?”

“How to manage authentication state in React using context?”

“How to align this project with the Enterprise Applications assignment rubric?”

All generated suggestions were manually reviewed, adapted, and implemented by the student.
The student fully understands the codebase and can explain all design and implementation choices during oral evaluation.

إذا حابة، في الخطوة الجاية أقدر:

* أراجع الـ **rubric نقطة نقطة** وأقولك إذا في أي مخاطرة
* أجهز لك **ملخص شفهي** للدفاع/الشرح
* أكتب **commit history نظيف** لو حابة ترتبيه قبل التسليم

قولي شو بدك نعمل بعدها 👍
