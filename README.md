# TaskManager - Full Stack Java Application

A complete full-stack task management application with Spring Boot backend, PostgreSQL database, React frontend, and JWT authentication.

##  Features

- **User Authentication**: JWT-based secure authentication
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter by status (TODO, IN_PROGRESS, COMPLETED)
- **Priority Levels**: Set task priorities (LOW, MEDIUM, HIGH)
- **Due Dates**: Assign due dates to tasks
- **Real-time Stats**: Dashboard with task statistics
- **Responsive UI**: Modern, mobile-friendly interface

##  Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Custom CSS

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for React)

##  Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

##  Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd taskmanager
```

2. **Run with Docker Compose**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Option 2: Manual Setup

#### Backend Setup

1. **Setup PostgreSQL Database**
```bash
# Create database
createdb taskmanager

# Or using psql
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

2. **Configure Database Connection**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Build and Run Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start on http://localhost:8080

#### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm start
```

Frontend will start on http://localhost:3000

##  Project Structure

```
taskmanager/
├── backend/
│   ├── src/main/java/com/taskmanager/
│   │   ├── config/          # Security & app configuration
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Database repositories
│   │   ├── security/       # JWT authentication
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # State management
│   │   └── services/       # API services
│   └── package.json
└── docker-compose.yml
```

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/status/{status}` - Get tasks by status

##  Example API Usage

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the full-stack application",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-31T00:00:00"
  }'
```

##  Frontend Features

- **Login/Register**: User authentication forms
- **Dashboard**: Overview with task statistics
- **Task List**: Display all tasks with filtering
- **Task Form**: Create and edit tasks
- **Responsive Design**: Works on desktop and mobile

##  Security

- Passwords are encrypted using BCrypt
- JWT tokens for stateless authentication
- Protected API endpoints
- CORS configuration for frontend-backend communication

##  Deployment

### Deploy to Cloud

1. **Backend**: Can be deployed to Heroku, AWS Elastic Beanstalk, or any Java hosting
2. **Frontend**: Can be deployed to Vercel, Netlify, or AWS S3
3. **Database**: Use managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)

### Environment Variables

For production, set these environment variables:

**Backend:**
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`

**Frontend:**
- `REACT_APP_API_URL`

##  Testing

Run backend tests:
```bash
cd backend
mvn test
```

##  Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [JWT.io](https://jwt.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

##  License

This project is open source and available under the MIT License.

##  Author

Aryan Pathak

##  Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- PostgreSQL for the robust database
