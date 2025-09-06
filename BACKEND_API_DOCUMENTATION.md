# SynergySphere Backend API Documentation

This document outlines all the backend API endpoints needed for the SynergySphere team collaboration platform.

## Base URL
```
https://your-api-domain.com/api/v1
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### POST /auth/logout
Logout user and invalidate token.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

---

## Project Endpoints

### GET /projects
Get all projects for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search projects by name or description
- `status` (optional): Filter by status (Active, On Hold, Completed)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj_123",
        "name": "E-Commerce Platform Redesign",
        "description": "Complete overhaul of the existing platform",
        "status": "Active",
        "priority": "High",
        "dueDate": "2024-03-15T23:59:59Z",
        "createdAt": "2024-01-01T09:00:00Z",
        "members": [
          {
            "id": "user_123",
            "name": "John Doe",
            "email": "john@example.com",
            "avatar": null,
            "role": "Owner"
          }
        ],
        "taskCount": 15,
        "completedTaskCount": 8
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### POST /projects
Create a new project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "status": "Active",
  "priority": "Medium",
  "dueDate": "2024-06-30T23:59:59Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "proj_124",
      "name": "New Project",
      "description": "Project description",
      "status": "Active",
      "priority": "Medium",
      "dueDate": "2024-06-30T23:59:59Z",
      "createdAt": "2024-01-15T10:00:00Z",
      "members": [
        {
          "id": "user_123",
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": null,
          "role": "Owner"
        }
      ]
    }
  },
  "message": "Project created successfully"
}
```

### GET /projects/:projectId
Get a specific project with full details.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "proj_123",
      "name": "E-Commerce Platform Redesign",
      "description": "Complete overhaul of the existing platform",
      "status": "Active",
      "priority": "High",
      "dueDate": "2024-03-15T23:59:59Z",
      "createdAt": "2024-01-01T09:00:00Z",
      "members": [
        {
          "id": "user_123",
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": null,
          "role": "Owner"
        }
      ],
      "tasks": [
        {
          "id": "task_123",
          "title": "Design user interface mockups",
          "description": "Create wireframes and high-fidelity mockups",
          "status": "Done",
          "priority": "High",
          "assigneeId": "user_123",
          "dueDate": "2024-01-15T10:00:00Z",
          "createdAt": "2024-01-01T09:00:00Z",
          "updatedAt": "2024-01-10T14:30:00Z"
        }
      ]
    }
  }
}
```

### PUT /projects/:projectId
Update a project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "On Hold",
  "priority": "Low",
  "dueDate": "2024-07-30T23:59:59Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "proj_123",
      "name": "Updated Project Name",
      "description": "Updated description",
      "status": "On Hold",
      "priority": "Low",
      "dueDate": "2024-07-30T23:59:59Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Project updated successfully"
}
```

### DELETE /projects/:projectId
Delete a project.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Task Endpoints

### GET /projects/:projectId/tasks
Get all tasks for a specific project.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): Filter by status (To-Do, In Progress, Done)
- `assigneeId` (optional): Filter by assignee
- `priority` (optional): Filter by priority (Low, Medium, High)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "task_123",
        "title": "Design user interface mockups",
        "description": "Create wireframes and high-fidelity mockups",
        "status": "Done",
        "priority": "High",
        "assigneeId": "user_123",
        "dueDate": "2024-01-15T10:00:00Z",
        "createdAt": "2024-01-01T09:00:00Z",
        "updatedAt": "2024-01-10T14:30:00Z"
      }
    ]
  }
}
```

### POST /projects/:projectId/tasks
Create a new task in a project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "To-Do",
  "priority": "Medium",
  "assigneeId": "user_123",
  "dueDate": "2024-02-15T10:00:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "task_124",
      "title": "New Task",
      "description": "Task description",
      "status": "To-Do",
      "priority": "Medium",
      "assigneeId": "user_123",
      "dueDate": "2024-02-15T10:00:00Z",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Task created successfully"
}
```

### PUT /tasks/:taskId
Update a task.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "In Progress",
  "priority": "High",
  "assigneeId": "user_456",
  "dueDate": "2024-02-20T10:00:00Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "task_124",
      "title": "Updated Task",
      "description": "Updated description",
      "status": "In Progress",
      "priority": "High",
      "assigneeId": "user_456",
      "dueDate": "2024-02-20T10:00:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    }
  },
  "message": "Task updated successfully"
}
```

### DELETE /tasks/:taskId
Delete a task.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Project Members Endpoints

### GET /projects/:projectId/members
Get all members of a project.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "user_123",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": null,
        "role": "Owner",
        "joinedAt": "2024-01-01T09:00:00Z"
      }
    ]
  }
}
```

### POST /projects/:projectId/members
Add a member to a project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "email": "newmember@example.com",
  "role": "Developer"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "user_456",
      "name": "Jane Smith",
      "email": "newmember@example.com",
      "avatar": null,
      "role": "Developer",
      "joinedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Member added successfully"
}
```

### PUT /projects/:projectId/members/:userId
Update a member's role in a project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "role": "Manager"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "member": {
      "id": "user_456",
      "role": "Manager"
    }
  },
  "message": "Member role updated successfully"
}
```

### DELETE /projects/:projectId/members/:userId
Remove a member from a project.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

---

## Discussion Endpoints

### GET /projects/:projectId/discussions
Get all discussions for a project.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "discussions": [
      {
        "id": "disc_123",
        "title": "Design System Implementation",
        "content": "We need to discuss the implementation...",
        "authorId": "user_123",
        "createdAt": "2024-01-10T14:30:00Z",
        "updatedAt": "2024-01-10T14:30:00Z",
        "commentCount": 3
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### POST /projects/:projectId/discussions
Create a new discussion.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "New Discussion",
  "content": "Discussion content here..."
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "discussion": {
      "id": "disc_124",
      "title": "New Discussion",
      "content": "Discussion content here...",
      "authorId": "user_123",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Discussion created successfully"
}
```

### GET /discussions/:discussionId/comments
Get all comments for a discussion.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "comment_123",
        "content": "Great point! I agree with this approach.",
        "authorId": "user_456",
        "createdAt": "2024-01-10T15:00:00Z",
        "updatedAt": "2024-01-10T15:00:00Z"
      }
    ]
  }
}
```

### POST /discussions/:discussionId/comments
Add a comment to a discussion.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is a new comment"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "comment_124",
      "content": "This is a new comment",
      "authorId": "user_123",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Comment added successfully"
}
```

---

## User Endpoints

### GET /users/search
Search for users (for inviting to projects).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q`: Search query (name or email)
- `limit` (optional): Maximum results (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_456",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "avatar": null
      }
    ]
  }
}
```

### PUT /users/profile
Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Updated Name",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  },
  "message": "Profile updated successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Access denied"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Something went wrong"
  }
}
```

---

## WebSocket Events (Real-time Features)

### Connection
Connect to WebSocket endpoint: `wss://your-api-domain.com/ws`

Include authentication token in query parameter: `?token=<your-jwt-token>`

### Events to Listen For

#### project:updated
```json
{
  "event": "project:updated",
  "data": {
    "projectId": "proj_123",
    "project": { /* full project object */ }
  }
}
```

#### task:created
```json
{
  "event": "task:created",
  "data": {
    "projectId": "proj_123",
    "task": { /* full task object */ }
  }
}
```

#### task:updated
```json
{
  "event": "task:updated",
  "data": {
    "projectId": "proj_123",
    "task": { /* full task object */ }
  }
}
```

#### discussion:new_comment
```json
{
  "event": "discussion:new_comment",
  "data": {
    "projectId": "proj_123",
    "discussionId": "disc_123",
    "comment": { /* full comment object */ }
  }
}
```

#### member:joined
```json
{
  "event": "member:joined",
  "data": {
    "projectId": "proj_123",
    "member": { /* full member object */ }
  }
}
```

### Events to Emit

#### join:project
Join a project room for real-time updates:
```json
{
  "event": "join:project",
  "data": {
    "projectId": "proj_123"
  }
}
```

#### leave:project
Leave a project room:
```json
{
  "event": "leave:project",
  "data": {
    "projectId": "proj_123"
  }
}
```

---

## Implementation Notes

1. **Authentication**: Use JWT tokens with appropriate expiration times
2. **Rate Limiting**: Implement rate limiting on all endpoints
3. **Data Validation**: Validate all input data using a schema validation library
4. **Error Handling**: Provide consistent error responses across all endpoints
5. **Logging**: Log all API requests and errors for debugging
6. **Database**: Use appropriate indexing for frequently queried fields
7. **Real-time**: Implement WebSocket connections for real-time collaboration features
8. **File Upload**: Add endpoints for avatar and file uploads if needed
9. **Notifications**: Implement push notification system for task assignments and mentions
10. **Security**: Implement proper CORS, input sanitization, and SQL injection prevention

This API specification provides a complete backend foundation for the SynergySphere collaboration platform.