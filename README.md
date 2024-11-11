# Hotel Booking Website (MERN Stack)

## Project Overview

This is a full-stack Hotel Booking Website built with the MERN Stack (MongoDB, Express, React, Node.js). The platform allows users to browse available hotels, check room availability, make bookings, and manage their reservations.

It offers features like user authentication, hotel search filters, booking management, and a responsive design optimized for both desktop and mobile views.

## Features
# User Authentication: 
   Register, login, and logout functionality for users.
# Hotel Search: 
   Users can search for hotels based on location, price, and rating.
# Room Availability: 
   View available rooms based on the selected dates.
# Booking System: 
   Users can book rooms by selecting the check-in and check-out dates.
# Booking Management: 
   View, cancel, and update bookings.
# Admin Dashboard: 
   Admin users can manage hotels, add new rooms, and view all bookings.
# Responsive Design: 
   The website is responsive and works well on both desktop and mobile devices.
## Technologies Used
# Frontend: 
   React.js, React Router, Bootstrap (for UI), Axios (for API calls)
# Backend: 
   Node.js, Express.js
# Database: 
   MongoDB
# Authentication: 
   JWT (JSON Web Tokens), bcrypt.js (for password hashing)
# State Management: 
   React Context API or Redux (optional)
# Deployment: 
   Heroku (for backend), Netlify or Vercel (for frontend)
## Prerequisites

Make sure you have the following installed on your machine:


Node.js (v14.x or later)

npm (Node Package Manager)

MongoDB (Local or Atlas account)

### Installation

## Step 1: Clone the Repository

git clone https://github.com/yourusername/hotel-booking-website.git

cd hotel-booking-website

## Step 2: Install Backend Dependencies

Navigate to the backend folder and install required dependencies:

cd backend

npm install

## Step 3: Install Frontend Dependencies

Navigate to the frontend folder and install required dependencies:


cd frontend

npm install

## Step 4: Configure Environment Variables

Create a .env file in the backend directory with the following variables:


PORT=5000

MONGO_URI=mongodb://localhost:27017/hotel-booking

JWT_SECRET=your-jwt-secret-key

Replace MONGO_URI with your MongoDB connection string. If you're using MongoDB Atlas, you can find the connection URI in your Atlas dashboard.

Set a secret key for JWT-based authentication (this should be a random string).

## Step 5: Start the Application

Run the backend server:

cd backend

npm start

Run the frontend application:

cd frontend

npm start

The frontend will typically run on http://localhost:3000 and the backend on http://localhost:5000.


## Step 6: Testing

The application should be fully functional after installation. You can test the following:


Register a new user and login.

Search for available hotels.

Make a booking and view it in the "My Bookings" section.

Admin users can manage hotel data from the admin dashboard.


Usage


## 1. User Registration and Login
Navigate to the Login or Register page.
Fill in the required details (name, email, password).
After successful registration, log in with your credentials.

## 2. Hotel Search
Use the search bar to find hotels by location, price, and rating.
Filters can be applied to narrow down the search results.

## 3. Booking a Room
Select a hotel from the search results.
Choose a room and select the check-in and check-out dates.
Proceed with the booking and confirm the reservation.

## 4. Admin Dashboard (for Admin Users)
Admin users can log in and access the Admin Dashboard.
Admins can add new hotels, manage hotel rooms, and view/manage bookings.

## 5. Booking Management
After making a booking, users can view and manage their bookings from the "My Bookings" page.
Users can cancel their bookings if needed.


Contributing
If you'd like to contribute to this project, feel free to fork it and submit pull requests. Here are a few ways you can help:

Add new features (e.g., room photos, multi-language support).

Improve the UI/UX design.

Fix any bugs or issues.

License
This project is licensed under the MIT License - see the LICENSE file for details.
