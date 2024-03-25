# Exercise Tracker

## Overview

This API provides endpoints to manage users and their exercises.

## Base URL

The base URL for all endpoints is: `https://localhost:3000/api`

## Endpoints

### Create a new user

- **URL**: `/users`
- **Method**: `POST`
- **Description**: Creates a new user with the provided username.
- **Request Body**:
  - `username` (string): The username of the new user.
- **Response**:
  - `username` (string): The username of the newly created user.
  - `_id` (string): The unique identifier of the newly created user.

### Add an exercise to a user

- **URL**: `/users/:_id/exercises`
- **Method**: `POST`
- **Description**: Adds a new exercise to the user with the specified _id.
- **Parameters**:
  - `:_id` (string): The unique identifier of the user.
- **Request Body**:
  - `description` (string): The description of the exercise.
  - `duration` (number): The duration of the exercise in minutes.
  - `date` (string, optional): The date of the exercise in the format "YYYY-MM-DD" (default is current date).
- **Response**:
  - `username` (string): The username of the user.
  - `_id` (string): The unique identifier of the user.
  - `date` (string): The date of the exercise.
  - `duration` (number): The duration of the exercise.
  - `description` (string): The description of the exercise.

### Get exercise log of a user

- **URL**: `/users/:_id/logs`
- **Method**: `GET`
- **Description**: Retrieves the exercise log of the user with the specified _id.
- **Parameters**:
  - `:_id` (string): The unique identifier of the user.
  - `from` (string, optional): Filter exercises from this date (format: "YYYY-MM-DD").
  - `to` (string, optional): Filter exercises until this date (format: "YYYY-MM-DD").
  - `limit` (number, optional): Limit the number of exercises returned.
- **Response**:
  - `_id` (string): The unique identifier of the user.
  - `username` (string): The username of the user.
  - `count` (number): The total number of exercises in the log.
  - `log` (array): An array of exercise objects, each containing:
    - `date` (string): The date of the exercise.
    - `duration` (number): The duration of the exercise.
    - `description` (string): The description of the exercise.

## Example Usage

### Create a new user

```json
POST /api/users
Content-Type: application/json

{
  "username": "john_doe"
}

```

### AAdd an exercise to a user

```json
POST /api/users/:_id/exercises
Content-Type: application/json

{
  "description": "Running",
  "duration": 30,
  "date": "2024-03-25"
}
```
### Get exercise log of a user

```json
GET /api/users/:_id/logs?from=2024-03-01&to=2024-03-31&limit=10
```

### Error Responses

*404 Not Found: If the requested user does not exist.*

```json
{
  "error": "User not found"
}
```