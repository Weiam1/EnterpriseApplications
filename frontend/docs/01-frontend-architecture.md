# Frontend Architecture Overview

## Project Goal
The frontend is a React-based web application that allows authenticated students to browse rental equipment, filter products by category, add items to a cart with a rental period, and confirm orders via checkout.

The frontend communicates with a secured Spring Boot backend via REST APIs.

---

## Technology Stack
- React (Vite)
- Material UI (MUI) for UI components
- React Router for client-side routing
- Axios for HTTP communication
- JWT-based authentication (via Authorization header)

---

## High-Level Structure
The frontend follows a clear separation of concerns:

- pages/  
  Full application pages mapped to routes (Home, Products, Cart, Checkout, Orders, Login, Register)

- components/  
  Reusable UI components (Navbar, layout elements)

- auth/  
  Authentication context and hooks (AuthContext, useAuth)

- api/  
  Centralized Axios configuration (axiosClient)

- router/  
  Application routing configuration (AppRouter)

---

## Routing Strategy
Client-side routing is implemented using React Router.

Each route corresponds to a page component:
- / → Home
- /products → Product catalog
- /cart → User cart
- /checkout → Order confirmation
- /orders → User order history
- /login /register → Authentication

Protected routes rely on backend security; the frontend adapts UI visibility based on authentication state.

---

## State Management
Global state is handled using React Context:

- AuthContext  
  Stores authentication state (isAuthenticated) and exposes login/logout actions.

Local component state is used for:
- product filtering
- search input
- quantity selection
- rental period selection
- UI feedback overlays

No external state library (Redux) is used to keep the proof-of-concept lightweight.

---

## Backend Communication
All API calls are performed via a centralized Axios client.

- JWT token is automatically attached to requests via Authorization header
- Public endpoints (products, categories) are accessible without authentication
- Cart, checkout, and orders require a valid token

This keeps API communication consistent and secure across the application.

---

## UI & UX Principles
- No browser alerts are used for core flows
- User feedback is shown inside the application (overlay modals)
- Navigation and available actions adapt to authentication state
- Focus on clarity and simplicity over visual complexity

---

## Summary
The frontend is designed as a clean, modular React application that mirrors the backend domain structure.
It prioritizes clear user flows, minimal state complexity, and secure interaction with the backend.
