# Admin Dashboard with Player Management

This project is a **Player Management Dashboard** for an admin to manage players, where the admin can:
- **View** a list of active players sorted by their creation date.
- **Block/Unblock** players.
- **Delete** players.

The dashboard is built using **React** for the frontend and **Express** for the backend, with **MongoDB** for data storage.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Setup and Configuration](#setup-and-configuration)


## Technologies Used

### Frontend
- **React** - For building the user interface.
- **Axios** - For making HTTP requests from the client to the server.
- **TailwindCSS** - For styling the components.
- **React Router** - For navigation within the app.

### Backend
- **Express** - For building RESTful APIs.
- **MongoDB** - Database to store player data.
- **JWT (jsonwebtoken)** - For secure user authentication.
- **bcryptjs** - For password hashing.
- **Socket.IO** - For real-time data updates.

## Features

- **Admin Dashboard**: Displays a list of active players with options to block/unblock or delete them.
- **Player Block/Unblock**: Toggle a player's status between blocked and unblocked.
- **Player Deletion**: Permanently delete a player from the database.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hackhub817/real-time-banana-game
   real-time-banana-game

2. **Install dependencies for backend**:
   ```bash
   npm install
   
3. **Install dependencies for frontend**:
   ```bash
   cd frontend
   npm install
   
4. **Environment Variables:**:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000

6. **Start the backend Servers:**:
    ```bash
    nodemon server.js

7. **Start the fronend Servers:**:
   ```bash
   cd ../frontend
   npm start
   
8. **Access the Dashboard**  
   Open your browser and go to **http://localhost:3000** to view the admin dashboard.









   
   
