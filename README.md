# Blog Backend Project API

A powerful and secure REST API for a blogging platform built with TypeScript, Node.js, Express.js, and MongoDB. This backend system features role-based access control, secure authentication, and comprehensive blog management capabilities.

## 🚀 Features

- **User Authentication**

  - Secure registration and login
  - JWT-based authentication
  - Password hashing and security

- **Role-Based Access Control**

  - Admin and User roles
  - Specific permissions for each role
  - User blocking functionality

- **Blog Management**

  - Create, read, update, and delete operations
  - Public blog access
  - Advanced search, sort, and filter capabilities

- **Security Features**
  - Protected routes
  - Input validation
  - Error handling
  - User blocking system

## 🛠️ Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Zod (for validation)
- Bcrypt

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/shihab-2021/Blog-Project-Backend.git
   cd Blog-Project-Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_mongodb_uri
   JWT_ACCESS_SECRET=your_jwt_secret
   JWT_ACCESS_EXPIRES_IN=1d
   BCRYPT_SALT_ROUNDS=8
   ```

4. **Run the application**

   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Register User. |
| POST   | `/api/auth/login`    | Login User.    |

### Blog Endpoints

| Method | Endpoint                                                                | Description                                  |
| ------ | ----------------------------------------------------------------------- | -------------------------------------------- |
| POST   | `/api/blogs`                                                            | Create Blog (Authorization: Bearer {token}). |
| PATCH  | `/api/blogs/:id`                                                        | Update Blog (Authorization: Bearer {token}). |
| DELETE | `/api/blogs/:id`                                                        | Delete Blog (Authorization: Bearer {token}). |
| GET    | `/api/blogs?search=keyword&sortBy=title&sortOrder=desc&filter=authorId` | Get All Blogs.                               |

### Admin Endpoints

| Method | Endpoint                         | Description                                      |
| ------ | -------------------------------- | ------------------------------------------------ |
| PATCH  | `/api/admin/users/:userId/block` | Block User (Authorization: Bearer {token}).      |
| DELETE | `/api/admin/blogs/:id`           | Delete Any Blog (Authorization: Bearer {token}). |

## 🔍 Query Parameters

The API supports the following query parameters for blog listings:

- `search`: Search blogs by title or content
- `sortBy`: Sort by fields (title, createdAt)
- `sortOrder`: Sort order (asc, desc)
- `filter`: Filter by author ID

## 👥 Admin Credentials

```
Email: admin@admin.com
Password: 123456
```

## 🔐 Error Handling

The API implements comprehensive error handling with consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Error details" },
  "stack": "Error stack trace"
}
```

## 🌐 Live Demo

- API Base URL: [Live Demo URL](https://blog-project-backend-teal.vercel.app/)
- Project Video: [Watch Project Presentation](https://drive.google.com/file/d/1HGjhGJCDF8AuAm3mfXGfXkyNNbuH4Qgt/view?usp=sharing)

## 🙏 Acknowledgments

- Course instructors and mentors
- Programming Hero team
- Fellow developers who provided feedback and suggestions

---

### 👍 Thank you
