# URL Shortener Microservice

# URL Shortener API Documentation

## Overview

The URL shortener application allows users to convert long URLs into short URLs, facilitating sharing and managing links.

## Features

- **URL Shortening**: Users can submit a long URL to be shortened.
- **Redirection**: Shortened URLs redirect to their corresponding original URLs.
- **URL Validation**: Valid URLs are accepted for shortening; invalid URLs are rejected.
- **Data Storage**: URLs and their corresponding short URLs are stored in a database for later reference.

## API Endpoints

- **POST /api/shorturl**: Route to shorten a URL.
  - Parameters: `url` (long URL to be shortened).
  - Response: JSON containing the original URL and its corresponding short URL.
  
- **GET /api/shorturl/:shortUrl**: Route to redirect to the original URL based on the provided short URL.
  - Parameters: `shortUrl` (short URL).
  - Response: Redirects to the original URL; if the short URL is invalid, returns a JSON error.

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side execution.
- **Express.js**: Web framework for Node.js for API creation.
- **body-parser**: Middleware to parse request bodies.
- **dns**: Module for DNS resolution.


## Installation and Usage

1. Install project dependencies: `npm install`.
2. Start the server: `npm run start`.
3. Use an HTTP client (e.g., Postman) to access the API endpoints.

## Example Usage

- **URL Shortening**:
  - **POST** `/api/shorturl`
  - Request body: `{ "url": "https://www.example.com" }`
  - Response: `{ "original_url": "https://www.example.com", "short_url": 1 }`
  
- **Redirection**:
  - **GET** `/api/shorturl/1`
  - Redirects to `https://www.example.com`.
  
