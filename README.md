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
https://your-api.onrender.com/api
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
git clone https://github.com/yourusername/trackifai-backend.git
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
- AI Resume Analysis
- AI Interview Preparation
- Job Match Scoring
- Resume Parsing
- Activity Logs
- API Rate Limiting

---

## 🌐 Frontend Repository

https://github.com/yourusername/trackifai-frontend

---

## 🚀 Live Frontend

https://trackifai.vercel.app

---

## 👨‍💻 Author

**Pawan Mishra**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

## 📄 License

This project is licensed under the MIT License.