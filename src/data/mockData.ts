import { Project, Task, User } from '@/types/project';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    role: 'Owner'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: null,
    role: 'Developer'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: null,
    role: 'Designer'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: null,
    role: 'Manager'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user interface mockups',
    description: 'Create wireframes and high-fidelity mockups for the main dashboard',
    status: 'Done',
    priority: 'High',
    assigneeId: '3',
    dueDate: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up user login, registration, and session management',
    status: 'In Progress',
    priority: 'High',
    assigneeId: '2',
    dueDate: '2024-01-20T17:00:00Z',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '3',
    title: 'Write project documentation',
    description: 'Create comprehensive documentation for the project setup and usage',
    status: 'To-Do',
    priority: 'Medium',
    assigneeId: '1',
    dueDate: '2024-01-25T12:00:00Z',
    createdAt: '2024-01-08T13:00:00Z',
    updatedAt: '2024-01-08T13:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance',
    status: 'Active',
    priority: 'High',
    dueDate: '2024-03-15T23:59:59Z',
    createdAt: '2024-01-01T09:00:00Z',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: [mockTasks[0], mockTasks[1]]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a cross-platform mobile application for our services using React Native',
    status: 'Active',
    priority: 'Medium',
    dueDate: '2024-04-30T23:59:59Z',
    createdAt: '2024-01-15T10:00:00Z',
    members: [mockUsers[1], mockUsers[3]],
    tasks: [mockTasks[2]]
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'Plan and execute the first quarter marketing campaign including social media, email, and content marketing',
    status: 'On Hold',
    priority: 'Low',
    dueDate: '2024-03-31T23:59:59Z',
    createdAt: '2024-01-10T14:00:00Z',
    members: [mockUsers[3]],
    tasks: []
  },
  {
    id: '4',
    name: 'Security Audit & Implementation',
    description: 'Comprehensive security review and implementation of enhanced security measures',
    status: 'Completed',
    priority: 'High',
    dueDate: '2024-01-31T23:59:59Z',
    createdAt: '2023-12-01T09:00:00Z',
    members: [mockUsers[0], mockUsers[1]],
    tasks: []
  }
];