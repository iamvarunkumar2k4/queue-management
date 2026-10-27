# Queue Management System

A real-time queue management application built with the MERN stack. Users can create sessions, join queues using a 5-letter shortcode, track their position, and receive real-time notifications about their queue status.

## 🌟 Features

- **User Authentication**: Secure login and signup with JWT-based authentication
- **Session Management**: Create sessions with unique 5-letter shortcodes or join existing sessions
- **Real-time Queue Tracking**: View your current position in the queue with live updates
- **QR Code Generation**: Generate QR codes for easy session sharing
- **Dashboard**: Centralized dashboard for managing sessions and viewing queue information
- **User Profiles**: Manage user profile information
- **Real-time Notifications**: Instant updates via Socket.io when your position changes
- **Responsive UI**: Mobile-friendly interface built with React Bootstrap

## 🛠️ Tech Stack

### Frontend
- **React** 19 - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Bootstrap** - UI component library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** with **Express.js** - Web server framework
- **MongoDB** with **Mongoose** - Database
- **JWT (JSONWebToken)** - Authentication
- **Socket.io** - Real-time bidirectional communication
- **QRCode** - QR code generation
- **Bcrypt** - Password hashing
- **Cors** - Cross-Origin Resource Sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud-based like MongoDB Atlas)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd queue-management-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend/my-app
npm install
```

Create a `.env` file in the frontend directory (if needed) with the API endpoint:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

The application will run on `http://localhost:3000`

## 📁 Project Structure

```
queue-management-system/
├── frontend/
│   └── my-app/                 # React frontend application
│       ├── public/             # Static assets
│       └── src/
│           ├── views/          # Page components
│           │   ├── Auth/       # Authentication views
│           │   ├── dashboard/  # Dashboard view
│           │   ├── homepage/   # Home page
│           │   ├── joinsession/# Join session view
│           │   ├── createsession/ # Create session view
│           │   ├── myposition/ # Queue position view
│           │   └── profile/    # User profile
│           ├── App.js          # Main App component
│           ├── Appcontext.js   # Context API setup
│           └── axios.js        # Axios configuration
├── server/                      # Express.js backend
│   ├── models/                 # Database models
│   │   ├── user.js            # User model
│   │   └── sessiondata.js      # Session model
│   ├── routes/                # API routes
│   │   ├── auth.js            # Authentication routes
│   │   ├── session.js         # Session routes
│   │   └── key.js             # Key routes
│   ├── middleware/            # Custom middleware
│   │   └── requiredLogin.js   # Authentication middleware
│   └── index.js               # Server entry point
└── README.md                   # Project documentation
```

## 🎯 Usage

### Creating a Session

1. Log in to the application
2. Navigate to "Create Session"
3. A 5-letter shortcode will be generated automatically
4. Share the code or QR code with others to join

### Joining a Session

1. Log in to the application
2. Navigate to "Join Session"
3. Enter the 5-letter session code
4. View your position in the queue

### Tracking Your Position

- Visit "My Position" to see your current queue position
- Real-time updates will notify you of any changes
- Receive notifications when it's your turn

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:
- Passwords are hashed using Bcrypt
- JWT tokens are issued upon successful login
- Authentication middleware protects secure routes

## 🔄 Real-time Features

Socket.io enables real-time communication:
- Instant queue position updates
- Live notification of queue status changes
- Seamless multi-user experience

## 📝 API Routes

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### Session Routes (`/api/session`)
- `POST /create` - Create a new session
- `GET /join/:code` - Join an existing session
- `GET /:sessionId` - Get session details
- `GET /position/:sessionId` - Get user's queue position

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Created by Varun Kumar
