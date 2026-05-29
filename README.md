






Complete Frontend Flow Explanation (MediGo)

User Opens Website
       ↓
React Application Starts
(main.tsx)
       ↓
App.tsx Loads
       ↓
AppRoutes.tsx Handles Routing
       ↓
Page Components Render
(Home / Login / Signup / Dashboard)
       ↓
Reusable Components Load
(Navbar, Forms, HeroSection, ProtectedRoute)
       ↓
User Fills Login/Signup Form
       ↓
fetch() / API Call Sent
(LoginForm.tsx / SignupForm.tsx)
       ↓
Backend API
(http://localhost:8080/api/auth)
       ↓
Backend Validates User
       ↓
Response Returns to Frontend
(Token + User Data)
       ↓
Token Stored in localStorage
       ↓
React Router Navigates User
       ↓
ProtectedRoute Checks Token
       ↓
Dashboard Opens
(User / Admin / ShopOwner)
       ↓
Frontend Reads User Data
(localStorage)
       ↓
UI Updates Dynamically
       ↓
Logout Removes Token
       ↓
Redirect to Login Page







Complete Backend Flow (MediGo)
Frontend (React)
       ↓
API Request (fetch / axios)
       ↓
Express Server (index.js)
       ↓
Routes (authRoutes / userRoutes)
       ↓
Middleware
(authMiddleware / validate)
       ↓
Controller
(authController.js)
       ↓
MongoDB (Mongoose Model)
       ↓
Response Sent Back
       ↓
Frontend UI Update



Authentication Flow
Signup/Login
      ↓
Backend Validation (Zod)
      ↓
Password Hashing (bcrypt)
      ↓
JWT Token Generated
      ↓
Token Stored in localStorage
      ↓
Protected Route Access
      ↓
Dashboard Access




