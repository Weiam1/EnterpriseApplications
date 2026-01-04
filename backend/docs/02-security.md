# 02 – Security

## Authentication Strategy
The application uses JWT-based authentication. After a successful login, the server generates a signed JSON Web Token containing the user’s email as subject. This token must be included in every secured request via the Authorization header.

## Password Handling
User passwords are never stored in plain text. During registration, passwords are hashed using BCrypt. During login, the provided password is verified against the stored hash.

## JWT Token Flow
- Token is generated at login using a secret key (HS256)
- Token contains subject (email) and expiration (24h)
- Each request is intercepted by a custom JwtAuthenticationFilter
- If the token is valid, the user is authenticated and stored in the SecurityContext

## Endpoint Protection
Public endpoints:
- /api/auth/**
- /api/products/**
- /api/categories/**

Protected endpoints:
- /api/cart/**
- /api/orders/**

All protected endpoints require a valid JWT token.

## Stateless Session Design
The backend is fully stateless. No HTTP session is stored on the server. Authentication is handled exclusively through JWT tokens.

## CORS Configuration
CORS is explicitly configured to allow requests from the frontend (http://localhost:5173), including Authorization headers.
