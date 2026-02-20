# 🎬 MovieList Backend API

A RESTful API built with **Node.js, Express, and MongoDB (Mongoose)** for managing a movie collection.

This backend allows users to:
- ➕ Add movies
- 📃 List movies
- ✏️ Update movie details
- ❌ Soft delete movies

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Nodemon

---

## 📁 Project Structure

```
movieList-Backend/
│
├── Controller/
│   └── movieController.js
│
├── Models/
│   └── movieSchema.js
│
├── Routes/
│   └── movieRouter.js
│
├── configuration/
│   └── db.js
│
├── server.js
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sourav4554/movieList-Backend.git
cd movieList-Backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Start the Server

Development mode (with nodemon):

```bash
npm run dev
```



Server runs on:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### ➕ Add Movie

**POST** `/api/movie/addmovie`

**Request Body:**

```json
{
  "tittle": "Inception",
  "category": "sci-fi",
  "rating": 9
}
```

---

### 📃 List Movies

**GET** `/api/movie/list`

Returns all movies where `isDeleted: false`.

---

### ✏️ Update Movie

**PATCH** `/api/movie/update/:id`

Example:

```
PATCH /api/movie/update/64f2c5a9a3e8c9e5f6a12345
```

**Request Body:**

```json
{
  "rating": 8
}
```

---

### ❌ Delete Movie (Soft Delete)

**DELETE** `/api/movie/delete/:id`

Marks movie as deleted:

```js
isDeleted: true
```

---

## 🧠 Movie Model Schema

| Field      | Type    | Description |
|------------|---------|------------|
| tittle     | String  | Required |
| category   | String  | Enum (action, comedy, drama, horror, sci-fi) |
| rating     | Number  | Range 1–10 |
| isDeleted  | Boolean | Default: false |

---

## 🧪 Testing

You can test the API using:
- Postman
- Insomnia
- Thunder Client (VS Code)

---

## 📦 Dependencies

```json
{
  "express": "^5.x",
  "mongoose": "^9.x",
  "dotenv": "^17.x",
  "nodemon": "^3.x"
}
```

---

## 💡 Future Improvements

- Authentication (JWT)
- Pagination
- Search & Filter
- Role-based authorization
- Deployment (Render / Railway / AWS)

---

## 👨‍💻 Author

Sourav Krishna  
GitHub: https://github.com/Sourav4554

---

