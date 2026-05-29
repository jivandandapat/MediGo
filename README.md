MediGo/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── logo.png
│   │   │   │   ├── doctor.png
│   │   │   │   └── hero-banner.png
│   │   │   │
│   │   │   └── icons/
│   │   │       ├── hide.png
│   │   │       └── view.png
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.tsx
│   │   │   │
│   │   │   ├── LoginForm/
│   │   │   │   └── LoginForm.tsx
│   │   │   │
│   │   │   ├── SignupForm/
│   │   │   │   └── SignupForm.tsx
│   │   │   │
│   │   │   ├── HeroSection/
│   │   │   │   └── HeroSection.tsx
│   │   │   │
│   │   │   └── ProtectedRoute/
│   │   │       └── ProtectedRoute.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── ShopOwnerDashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── utils/
│   │   │   └── auth.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── dist/
│   │
│   ├── .gitignore
│   ├── eslient.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── README.md
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   └── shopRoutes.js
│   │
│   ├── validations/
│   │   └── authValidation.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── package-lock.json
└── package.json




Root package.json (for concurrently):

{
  "name": "medigo",
  "version": "1.0.0",

  "scripts": {

    "client": "cd frontend && npm run dev",

    "server": "cd backend && nodemon index.js",

    "dev": "concurrently \"npm run server\" \"npm run client\"",

    "build": "cd frontend && npm run build",

    "start": "npm run build && cd backend && npm start"
  },

  "dependencies": {
    "concurrently": "^9.2.1"
  }
}






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




