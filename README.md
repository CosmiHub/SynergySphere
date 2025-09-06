# SynergySphere

**SynergySphere** is a collaborative project management tool built with modern technologies like Express.js, Prisma, PostgreSQL for the backend, and React/Next.js for the frontend. It enables users to manage projects, tasks, messages, notifications, and team collaborations seamlessly.

---

## 🚀 Tech Stack

**Backend**
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT for authentication

**Frontend**
- React.js / Next.js
- Tailwind CSS (optional styling)
- Axios / Fetch for API requests

---

## 📂 Project Structure


---

## ⚙ Backend Setup

### 1. Install dependencies

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev


📂 Backend Routes
Authentication

POST /auth/login
Login using email and password. Returns a JWT token.

POST /auth/register
Register a new user.

Projects

POST /projects
Create a new project
Body: { name, description, deadline, status, priority, managerId }
Requires authentication.

GET /projects
Get all projects with details
Requires authentication.

Tasks

POST /tasks
Create a new task
Body: { title, description, status, priority, dueDate, projectId, assigneeId }

GET /tasks/:id
Get a task by ID

Messages

POST /messages
Send a new message in a project
Body: { content, projectId }

GET /messages/:projectId
Get all messages for a project

Notifications

GET /notifications
Get user notifications
Requires authentication.

PUT /notifications/:id/read
Mark a notification as read.

Users

GET /users/me
Get current authenticated user details.
