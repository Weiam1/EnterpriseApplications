# Frontend Design Decisions

## Purpose
This document explains the key design decisions made in the frontend
and why they were chosen for this proof-of-concept project.

The focus is on clarity, simplicity, and alignment with the backend architecture.

---

## 1) Separation of Pages by Responsibility
Each core feature has its own page:
- Products (catalog & filtering)
- Cart (temporary session state)
- Checkout (confirmation step)
- Orders (historical overview)

This avoids:
- Large, complex components
- Mixed responsibilities in a single page

It also improves readability and maintainability.

---

## 2) Minimal Business Logic in Frontend
All critical business rules are handled by the backend:
- Cart validation
- Order creation
- User ownership checks
- Price calculations

The frontend only:
- Collects user input
- Sends HTTP requests
- Displays results

This keeps the frontend lightweight and secure.

---

## 3) JWT-Based Authentication Handling
Authentication is handled using JWT tokens:
- Token is stored client-side
- Token is sent automatically via Axios interceptor
- Protected routes rely on backend validation

This approach:
- Keeps the frontend stateless
- Matches the backend’s security model
- Prevents access to other users’ data

---

## 4) Explicit User Feedback (No Browser Alerts)
Instead of browser alerts:
- Custom confirmation overlays are used
- Feedback is shown in centered cards
- User actions are always clear

This improves:
- User experience
- Visual consistency
- Professional appearance

---

## 5) Controlled Inputs per Product
For each product card:
- Quantity is managed locally per product
- Start and end dates are stored per product ID

This allows:
- Renting the same product multiple times
- Different rental periods per product
- Clear mapping to backend CartItem logic

---

## 6) Simple Search & Filtering Strategy
Search and filtering are implemented client-side:
- Category filtering via backend endpoints
- Text search via in-memory filtering

This is sufficient for:
- A limited product catalog
- Proof-of-concept performance
- Clear demonstration of functionality

---

## 7) UI Consistency Across Pages
Shared patterns are reused:
- Cards for products and orders
- Centered confirmation overlays
- Consistent button styling and spacing

This ensures:
- Predictable navigation
- Reduced cognitive load for users
- A cohesive look and feel

---

## 8) Proof-of-Concept Scope Decisions
Certain features were intentionally kept simple:
- No stock availability checks
- No overlapping rental validation
- No payment integration

These decisions keep the project focused on
core learning objectives and rubric requirements.

---

## Summary
The frontend design prioritizes:
- Clear separation of concerns
- Minimal logic duplication
- Strong alignment with backend architecture
- Clean and understandable user flows

This results in a maintainable, readable, and well-scoped proof-of-concept frontend.
