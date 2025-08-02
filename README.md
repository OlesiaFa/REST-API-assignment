# REST-API-assignment
# Simple REST API with Node.js, Express & Firebase RTDB

## Overview
This is a backend application that provides RESTful endpoints to manage **Users**, **Expenses**, and **Income**, using Firebase Realtime Database.

##Tech Stack
Node.js – JavaScript runtime environment (v22.16.0)
Express.js – Web framework for Node.js
Firebase Realtime Database – Cloud-hosted NoSQL database used for storing users, income, and expenses
Nodemon – Automatically restarts the server on code changes (used in development)

##Getting Started
1. git clone https://github.com/OlesiaFa/REST-API-assignment.git
2. cd REST-API-assignment
3. Install Dependencies:
 npm install
4. Create a file named .env in the root directory of the project with the following content:
   FIREBASE_API_KEY=your_firebase_api_key
replase your_firebase_api_key with actual credentials from your Firebase project's settings
5. Run the Project:
npm start 
 This will start the server on:
http://localhost:3000

##Available Endpoints
Root:
  GET / — Welcome message with available endpoints.

Users:
GET /users
POST /users
PUT /users/:id
DELETE /users/:id


Income Endpoints:
a. GET /income - Retrieve all income.
b. POST /income - Add a new income.
c. PUT /income/:id - Update an existing income by ID.
d. DELETE /income/:id - Delete an income by ID.
Data:
{
      "wages": 1400,
      "secondaryIncome": 700,
      "interest": 120,       
      "supportPayment": 40,
      "others": 100             
 }


Expenses:
GET /expenses
POST /expenses
PUT /expenses/:id
DELETE /expenses/:id