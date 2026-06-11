# ⚙️ TrackifAI Backend

Backend API for TrackifAI, an AI-powered Job Application Tracking Platform. This service handles authentication, application management, interview tracking, resume management, analytics, and user data.

---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 👤 User Registration & Login
- 📋 Job Application CRUD Operations
- 📊 Dashboard Analytics
- 🎯 Interview Tracking
- 📄 Resume Management
- 🔍 Search, Filter & Pagination
- 📝 Application Notes
- 🔄 Application Status Updates
- 🌐 RESTful API Architecture
- 🛡️ Protected Routes
- ⚡ MongoDB Database Integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors
- multer (if using file uploads)

---

## 📂 Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── applicationController.js
│   ├── interviewController.js
│   └── resumeController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Application.js
│   ├── Interview.js
│   └── Resume.js
│
├── routes/
│   ├── authRoutes.js
│   ├── applicationRoutes.js
│   ├── interviewRoutes.js
│   └── resumeRoutes.js
│
├── uploads/
│
├── server.js
├── package.json
└── .env
```

---

## 🔗 Live API

**Base URL**

```text
https://trackifai-backend1.onrender.com/api
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/pawanx/TrackifAI-Backend.git
```

### Navigate to Project

```bash
cd trackifai-backend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## 🔐 Authentication

Protected routes require JWT token.

Example Header:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 📋 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get User Profile |

---

### Applications

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/applications | Get Applications |
| POST | /api/applications | Create Application |
| GET | /api/applications/:id | Get Single Application |
| PUT | /api/applications/:id | Update Application |
| DELETE | /api/applications/:id | Delete Application |
| PATCH | /api/applications/:id/status | Update Status |

---

### Interviews

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/interviews | Get Interviews |
| POST | /api/interviews | Create Interview |
| PUT | /api/interviews/:id | Update Interview |
| DELETE | /api/interviews/:id | Delete Interview |

---

### Resumes

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/resumes | Get Resumes |
| POST | /api/resumes | Upload Resume |
| DELETE | /api/resumes/:id | Delete Resume |

---

## 📨 Sample Requests & Responses

### Register User

#### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Pawan Mishra",
  "email": "pawan@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "6854ab123456789",
    "name": "Pawan Mishra",
    "email": "pawan@example.com"
  }
}
```

---

### Login User

#### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "pawan@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "6854ab123456789",
    "name": "Pawan Mishra",
    "email": "pawan@example.com"
  }
}
```

---

### Create Application

#### Request

```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "companyName": "Google",
  "role": "Frontend Developer",
  "status": "Applied",
  "source": "LinkedIn",
  "applicationDate": "2026-06-11"
}
```

#### Response

```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "_id": "6854cd123456789",
    "companyName": "Google",
    "role": "Frontend Developer",
    "status": "Applied",
    "source": "LinkedIn"
  }
}
```

---

### Get Applications

#### Request

```http
GET /api/applications?page=1&limit=10
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "6854cd123456789",
      "companyName": "Google",
      "role": "Frontend Developer",
      "status": "Interview",
      "source": "LinkedIn"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 42
  }
}
```

---

### Update Application Status

#### Request

```http
PATCH /api/applications/:id/status
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "status": "Interview"
}
```

#### Response

```json
{
  "success": true,
  "message": "Application status updated successfully",
  "data": {
    "_id": "6854cd123456789",
    "status": "Interview"
  }
}
```

---

### Create Interview

#### Request

```http
POST /api/interviews
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "applicationId": "6854cd123456789",
  "round": "Technical Round",
  "date": "2026-06-15",
  "notes": "Prepare React and JavaScript concepts"
}
```

#### Response

```json
{
  "success": true,
  "message": "Interview scheduled successfully",
  "data": {
    "_id": "6854ef123456789",
    "round": "Technical Round",
    "date": "2026-06-15"
  }
}
```

---

### Error Response

#### Response

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

or

```json
{
  "success": false,
  "message": "Application not found"
}
```

---

## 🔑 Authentication Flow

```text
Register/Login
      ↓
 Receive JWT Token
      ↓
 Store Token
      ↓
 Send Authorization Header

Authorization: Bearer <token>
      ↓
 Access Protected Routes
```

---

## 📊 Application Status Workflow

```text
Applied
   ↓
Assessment
   ↓
Interview
   ↓
Offer

OR

Rejected
```

---

## 🔒 Security Features

- Password Hashing using bcrypt
- JWT Token Authentication
- Protected Routes Middleware
- Environment Variable Protection
- MongoDB Validation
- Request Validation

---

## 🚧 Future Enhancements

- Forgot Password
- Email Notifications
- API Rate Limiting

---

## 🌐 Frontend Repository

https://github.com/pawanx/TrackifAI-FE

---

## 🚀 Live Frontend

https://trackif-ai-fe.vercel.app/

---

## 👨‍💻 Author

**Pawan Mishra**

- GitHub: https://github.com/pawanx
- LinkedIn: https://www.linkedin.com/in/pawan-mishra-08b3b9133/

---

## 📄 License

This project is licensed under the MIT License.