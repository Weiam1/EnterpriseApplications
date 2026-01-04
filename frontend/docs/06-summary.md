# Frontend Documentation Summary

## Overview
This frontend was developed as part of a proof-of-concept
equipment rental platform.

The goal was to build a clear, functional, and well-structured user interface
that integrates cleanly with the Spring Boot backend.

---

## Implemented Features
The frontend supports the following user flows:

- User authentication (JWT-based)
- Product catalog browsing
- Category filtering
- Product search
- Adding products to cart with:
    - Quantity
    - Rental period (start date & end date)
- Cart overview
- Checkout confirmation
- Order history per authenticated user

---

## Architectural Principles
The frontend follows these core principles:

- Clear separation of concerns per page
- Stateless frontend with backend-driven logic
- Minimal duplication of business rules
- Predictable and reusable UI patterns

---

## Communication with Backend
All data interactions occur via REST APIs:
- Axios is used as HTTP client
- JWT token is sent via Authorization header
- Errors and validations are handled server-side

This ensures:
- Data integrity
- Security
- Consistency between frontend and backend

---

## Scope Limitations
As a proof-of-concept, the frontend intentionally excludes:
- Payment processing
- Advanced availability checks
- Admin management features

These decisions keep the project aligned with the course objectives.

---

## Conclusion
The frontend demonstrates:
- Correct integration with a secured backend
- Clean component structure
- Clear and understandable user flows
- A professional level of documentation

Together with the backend, this forms a complete and coherent proof-of-concept
that satisfies the functional and architectural requirements of the assignment.
