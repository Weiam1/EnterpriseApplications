# Authentication Flow (Frontend)

## Purpose
The authentication flow controls access to protected features in the application.
Only authenticated users can:
- view products
- add items to the cart
- checkout
- view orders

Unauthenticated users are limited to public pages (Home, Login, Register).

---

## Authentication Strategy
Authentication is based on **JWT tokens** issued by the backend.

- The backend returns a JWT after a successful login
- The token is stored in `localStorage`
- The token is sent with every protected API request via the `Authorization` header

The frontend does not validate the token itself; validation is fully handled by the backend.

---

## AuthContext
Authentication state is managed globally using React Context.

The AuthContext provides:
- `isAuthenticated` → boolean indicating login state
- `login(token, userId)` → stores token and updates state
- `logout()` → clears token and resets state

This allows all components to react immediately to login/logout without page refresh.

---

## Login Flow
1. User submits email and password on the Login page
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates credentials and returns a JWT
4. `login()` is called:
    - token is saved in `localStorage`
    - `isAuthenticated` is set to `true`
5. User is redirected to the Home page
6. Navigation updates instantly (Products, Cart, Orders become visible)

No browser popups are used; navigation feedback is handled inside the app.

---

## Logout Flow
1. User clicks Logout in the navigation bar
2. `logout()` is called:
    - token is removed from `localStorage`
    - authentication state is reset
3. User is redirected to the Login page
4. Protected navigation items disappear immediately

---

## Conditional UI Rendering
The navigation bar adapts based on authentication state:

- Authenticated users see:
    - Products
    - Cart
    - Orders
    - Logout

- Unauthenticated users see:
    - Home
    - Login
    - Register

This ensures a clear and secure user experience without relying on manual page refreshes.

---

## Security Considerations
- JWT is never exposed in the UI
- Sensitive logic remains on the backend
- Frontend only controls visibility, not authorization
- All protected endpoints are enforced server-side

---

## Summary
The authentication flow is simple, reactive, and secure.
Using React Context ensures immediate UI updates, while JWT-based security is fully enforced by the backend.
