# Barber Voyage Server

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Barber Voyage is a server-side application designed to manage user authentication and data for a barber shop management system. This README provides instructions on how to set up, run, and contribute to the project.

## Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB (v4.0.0 or later)
- Git (optional, for cloning the repository)

## Installation

1. Clone the repository (if you have Git installed):
git clone https://github.com/mahmudulturan/barber-voyage-server.git

   Or download the repository as a ZIP file from GitHub.

2. Navigate to the project directory:
    cd barber-voyage-server


3. Install the project dependencies:
    npm install


4. Create a `.env` file in the root directory of the project and add the necessary environment variables (refer to `.env.example` for required variables).

## Running the Application

1. Start the MongoDB server (if not already running).

2. Run the application:

    `npm run dev`



3. The server will start, and you can access it at `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

- **POST /api/v1/auth/register**: Register a new user.
- **POST /api/v1/auth/login**: Authenticate a user and return a JWT token.
- **GET /api/v1/auth/logout**: Log out a user and clear the authentication token.
