# Student Management System

A full-featured student management web application with role-based authorization, JWT authentication, and MongoDB integration. Built to handle courses, students, and enrollments efficiently, it provides secure access control for Admins, Students, and Viewers.

## Features

### Role-Based Authorization

- **Admin**
  - Full CRUD operations on:
    - Users
    - Students
    - Courses
    - Enrollment Schemes
  - Can view and manage all data in the system.

- **Student**
  - Can enroll and unroll in courses.
  - Can view their own enrolled courses.

- **Viewer**
  - Read-only access to:
    - List of all students and courses
    - Enrolled courses for any student

### JWT-Based Authentication

- Secure login and signup functionality.
- Only Admins can create new user accounts.
- JWT token is required to access protected routes.

### Student & Course Management

- View all students and courses.
- View single student or course details.
- Search functionality available for users.

### User Profile Management

- Users can update:
  - Username
  - Password

### Unique User Identification

- Every user is assigned a unique `USER_ID`.
- If the user is a student, this ID is mapped to their Student ID for tracking enrollments.

### Tech Stack

- **Backend Database**: MongoDB
  - Collections:
    - `Users`
    - `Students`
    - `Courses`
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-based

## Collections & Structure

- **Users Collection**
  - Stores credentials, role, and metadata for all users.
- **Students Collection**
  - Contains student details and their mapped `USER_ID`.
- **Courses Collection**
  - Course metadata and information.

## Search & Permissions

- Search available for all users (limited by their role).
- Only Admins and the logged-in user can update profile information.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pip install -r requirements.txt  # if using Python backend
   ```

3. Set up your `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   ```bash
   npm run start
   # or
   python app.py
   ```

## API Endpoints (Basic Overview)

| Method | Endpoint               | Access  | Description                  |
|--------|------------------------|---------|------------------------------|
| POST   | `/login`               | Public  | Authenticate user            |
| POST   | `/signup`              | Admin   | Register new user            |
| GET    | `/users`               | Admin   | View all users               |
| GET    | `/students`            | All     | List all students            |
| GET    | `/courses`             | All     | List all courses             |
| POST   | `/enroll/:courseId`    | Student | Enroll in a course           |
| DELETE | `/unroll/:courseId`    | Student | Unroll from a course         |
| PUT    | `/user/update-profile` | User    | Update username/password     |

## Future Enhancements

- Admin dashboard UI
- Course scheduling and deadlines
- Notification system for enrollment updates
- Graphs for analytics (enrollments, active students)

## License

MIT License © 2025 [Kartik Upadhyay]
