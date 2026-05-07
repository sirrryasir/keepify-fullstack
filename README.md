# Keepify — Secure Fullstack Note App

Welcome to **Keepify**, a Google Keep clone built during **Session 12** of the Ardaykaab Academy Backend Masterclass.

This repository contains the **Foundation Code** (Authentication & Authorization) that we built together. Your mission is to take this foundation and build a complete, professional note-taking system.

## The Foundation (What's Done)

- [x] **Backend Auth:** Secure User registration and login.
- [x] **Password Security:** Hashing credentials using `bcryptjs`.
- [x] **Tokenization:** JWT-based authentication flow.
- [x] **Frontend Auth:** Login and Signup forms with state management.
- [x] **CORS Setup:** Backend configured to accept frontend requests.

## Your Mission (The Assignment)

Follow the [Assignment-Keepify-Fullstack.html](Assignment-Keepify-Fullstack.html) guide to complete the following:

### 1. Backend Hardening

- Create an `authMiddleware.js` to protect private routes.
- Update the `Note` schema to include a reference to the `User`.
- Implement full CRUD (Create, Read, Update, Delete) for notes.
- **Critical:** Ensure users can only see and manage their own notes.

### 2. Modern Frontend Integration

- **TanStack Query:** Do NOT use basic `useEffect` for data fetching. Implement TanStack Query for caching and smooth UI updates.
- **Authorization Headers:** Pass the JWT token in every request to the backend.
- **Dashboard UI:** Build a responsive grid for notes with the ability to add, edit, and delete.

## Installation & Setup

Follow these steps to set up the project:

### 1. Clone the Repo
Download the code using your terminal:
```bash
git clone https://github.com/sirrryasir/keepify-fullstack.git
cd keepify-fullstack
```

### 2. Setup Backend
Navigate to the backend folder, install dependencies, and set up your environment variables:
```bash
cd backend
npm install

# Create the .env file by copying the example
cp .env.example .env
```
**Note:** Now open the `.env` file and add your `MONGO_URI` and `JWT_SECRET`.

Then start the server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal, navigate to the frontend folder, then install and start the app:
```bash
cd frontend
npm install
npm run dev
```

## The "Pro" Goal

Try to implement **Optimistic Updates** using TanStack Query so that notes appear instantly before the server even responds!
