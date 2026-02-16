# Access Request Management Portal

A full-stack solution for managing system access requests with role-based access control (RBAC).

## 🚀 Tech Stack
- **Frontend**: React (Vite), Axios, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB, JWT, BcryptJS
- **Styling**: Vanilla CSS (Premium Glassmorphism Design)

## 👥 User Roles & Permissions
### 1. REQUESTER
- Register and login.
- Submit access requests (One pending request at a time).
- View own request status history.
### 2. APPROVER
- Login.
- View all system access requests.
- Approve or Reject requests with optional comments.

## 🛠 API Endpoints
### Auth
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate and get JWT

### Requests
- `POST /api/requests` - Submit a new request (Requester only)
- `GET /api/requests/my` - View own requests (Requester only)
- `GET /api/requests/all` - View all requests (Approver only)
- `PUT /api/requests/:id` - Update request status (Approver only)

## 🗄 Database Schema
### User
- `username`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum ('REQUESTER', 'APPROVER')

### AccessRequest
- `requester`: ObjectId (Ref: User)
- `reason`: String
- `status`: Enum ('PENDING', 'APPROVED', 'REJECTED')
- `reviewedBy`: ObjectId (Ref: User)
- `comments`: String

## 🏁 Setup Instructions
1. **Backend**:
   - `cd backend`
   - `npm install`
   - Create `.env` with `MONGODB_URI` and `JWT_SECRET`.
   - `npm start`
2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
