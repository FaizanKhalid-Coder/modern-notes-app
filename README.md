# 📝 NotesAI - Notes Management System

A modern **Notes Management System** built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. The application provides secure authentication, complete CRUD functionality, note organization, analytics, and a responsive frontend interface.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* Password Hashing with bcrypt
* Auto Login
* Logout

### 📝 Notes Management

* Create Notes
* View All Notes
* Update Notes
* Delete Notes (Soft Delete)
* Archive Notes
* Restore Archived Notes
* Search Notes
* Notes by Category
* Notes by Month
* Tags Support

### 📊 Analytics

* Total Notes
* Active Notes
* Archived Notes
* Total Tags
* Monthly Statistics

### 🎨 Frontend

* Modern Dashboard
* Responsive UI
* Dark Theme
* Analytics Cards
* Sidebar Navigation
* User Profile Section

### 🧪 API Testing

* Complete API Collection using **Bruno**

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser
* dotenv
* CORS

## Frontend

* HTML5
* CSS3
* JavaScript

## Tools

* Bruno API Client
* VS Code
* Git & GitHub

---

# 📂 Project Structure

```text
Notes-App/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── noteController.js
│   └── analyticsController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   ├── noteRoutes.js
│   └── analyticsRoutes.js
│
├── public/
│   └── notes-app.html
│
├── .env
├── package.json
└── server.js
```

---

# 📡 API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

## Notes

* POST `/api/notes`
* GET `/api/notes`
* GET `/api/notes/:id`
* PUT `/api/notes/:id`
* PUT `/api/notes/archive/:id`
* DELETE `/api/notes/:id`
* GET `/api/notes/search`
* GET `/api/notes/category`
* GET `/api/notes/month`

## Analytics

* GET `/api/analytics`

---

# 🔒 Security

* JWT Authentication
* Protected APIs
* Password Encryption (bcrypt)
* Environment Variables
* Authorization Middleware

---

# 🧪 API Testing

All APIs are tested using **Bruno API Client**, making it easy to validate endpoints during development.

---

# 📸 Screenshots

<img width="959" height="539" alt="image" src="https://github.com/user-attachments/assets/fbf7048a-7ccf-48c4-833e-56b425452b1b" />

* 🖥️ Dashboard
* 🔐 Authentication
* 📊 Analytics
* 📝 Notes CRUD
* 🧪 Bruno API Testing

---

# 🚀 Future Improvements

* File Uploads
* Rich Text Editor
* Note Sharing
* Favorites
* Dark/Light Mode
* Email Verification
* Password Reset
* Docker Deployment

---

# 👨‍💻 Author

**Faizan Khalid**

Computer Science Student | Backend Developer | MERN Stack Learner

---

⭐ If you like this project, don't forget to star the repository!
