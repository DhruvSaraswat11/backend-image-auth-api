
## 📌 Project Description

This project is a **Node.js + Express + MongoDB** based backend that provides **user authentication, image upload**, and **admin-level operations**. The API uses **JWT authentication**, **Multer** for image uploads, and MongoDB (Mongoose) for database operations.

## 🚀 Features

* **User Registration & Login** (JWT Token Based)
* **Password Hashing** using bcrypt
* **Image Upload** using Multer (Single/Multiple)
* **Fetch All Uploaded Images**
* **Delete Uploaded Image**
* **Change User Password**
* **Admin Routes** (Protected)
* **Middleware for Token Verification**
* **MongoDB Database Connection**

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Multer (Image Upload)**
* **dotenv** for environment config

---

# 📡 API Endpoints

## 🔐 Authentication Routes

### **POST /api/auth/register**

Register a new user.
**Body:** `{ username, email, password, role }`

### **POST /api/auth/login**

Login user and get JWT token.
**Body:** `{ username, password }`

---

## 👤 User Routes

### **put /api/auth/login/changepassword** *(Protected)*

Change user password.

---

## 🏞 Image Routes

### **POST /api/image/upload** *(Protected)*

Upload an image using Multer.

### **GET /api/images/get**

Fetch all uploaded images.

### **DELETE /images/:id** *(Protected)*

Delete specific image by ID and bearer token of admin

---

## 🛂 Admin Routes

### **GET /api/admin/welcome** *(Protected, Admin Only)*
body :
{
    "username" : ".." ,
     "email" : ".." ,
    "password" : ".." 
}

---

# ⚙️ Environment Variables (.env)

```
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
```

---

# ▶️ How to Run the Project

```
npm install
npm start
```

---

# 🧪 Testing Instructions

* Use **Postman** / **Thunder Client**
* Add token in **Authorization → Bearer Token** for protected routes
* Test image upload using **form-data** → `file`

---

