# DevConnect

DevConnect is a full-stack social media platform that allows users to create profiles, share posts (similar to Twitter), follow/unfollow others, and view a timeline populated by posts from followed users.

**Deployed URL:**  (Login to your vercel account first and then if the backend doesn't start immediately wait for 15 seconds)
[https://devconnect-lfpvjo7ng-priyankas-projects-3407f629.vercel.app](https://devconnect-lfpvjo7ng-priyankas-projects-3407f629.vercel.app)

---

## Features

- JWT-based authentication (signup/login)
- Create and update user profiles
- Post text updates
- Follow or unfollow other users
- Timeline view with posts from followed users
- Explore page to discover other users
- Fully responsive UI

---

## Tech Stack

### Frontend
- React.js (Functional Components + Hooks)
- React Router
- Axios for API communication
- Material UI

### Backend
- Node.js with Express.js
- JSON Web Token (JWT) for secure authentication
- RESTful API structure
- Middleware for auth validation
- Modular route and controller structure

### Database
- MongoDB (with Mongoose ODM)
- Schema Design:
  - **User**: name, email, password, bio, followers, following
  - **Post**: text, timestamp, userId

---

## Folder Structure
DevConnect/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── pages/ # Login, Signup, Profile, Timeline, Explore
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── App.css
│ │ └── other assets
│ └── package.json
├── server/ # Node + Express backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── auth.js
│ └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/priyankahotkar/DevConnect.git
cd DevConnect

Backend Setup
cd server
npm install
Create a .env file in the server/ directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server
node index.js

Frontend Setup
cd ../client
npm install
npm start

