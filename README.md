# Sports Management :package:

## Description

Sports Management is a web application developed using the NestJS framework with TypeScript and Express. The application is designed to manage sports classes at a sports complex, providing an easy-to-use interface for administrators to manage various sports, such as baseball, basketball, and football. The app allows for user registration, role-based access control, and CRUD operations for sports classes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Run the app](#run-the-app)
- [Usage](#usage)

## Features

- User registration with email and password
- Role-based authorization for enabling sports and user management
- Users can filter and retrieve all sports education classes
- Detailed view of each sports class (week schedule, class duration, description)
- Users can apply for sports education classes
- Admin users can manage sports classes (CRUD operations)
- Swagger API documentation for easy exploration of the API

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Server**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **API Documentation**: [Swagger](https://swagger.io/)

## Environment Variables

To run the application, you need to set up the environment variables in a `.env` file. Here's an example of the required variables:
:lock:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=user
DATABASE_PASSWORD=user
DATABASE_NAME=sports_complex_db
JWT_SECRET=mySecret_1234_111!!!!
```

Make sure to place the `.env` file in the root of your project directory.

## Run the app

1. **Start the Application**: Run the following command to start the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

2. **Run the Application: Start the application in development mode by executing**:

   ```bash
   npm run start
   ```

3. **Stop the application and remove orphan containers**:

   ```bash
   docker-compose down --remove-orphans
   ```

   **Or to also remove volumes(db)**

   ```bash
   docker-compose down --remove-orphans --volumes
   ```

## Usage

After successfully starting the application, you can interact with it through various endpoints. Here’s how to get started:

### Accessing the Application

- **API Endpoint**: Navigate to `http://localhost:3000` in your web browser to access the main application.
- **Swagger Documentation**: For detailed API documentation, including available endpoints and request formats, visit `http://localhost:3000/api/docs`.

### Authentication

#### User Registration

Users can register by sending a POST request to `/auth/register` with their email and password.

#### User Login

Users can log in to receive a JWT token by sending a POST request to `/auth/login` with their credentials.

#### Protected Routes :closed_lock_with_key:

Use the JWT token in the Authorization header (`Bearer <token>`) to access protected routes that require role-based access.
