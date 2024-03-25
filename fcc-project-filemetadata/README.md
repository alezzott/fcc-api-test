# File Metadata Microservice

## Overview
This API allows users to upload files and receive analysis about the uploaded files. The API provides endpoints for uploading files and retrieving analysis data.

## Base URL
The base URL for the API is `http://localhost:3000`, unless configured differently.

## Endpoints

### 1. Upload File

- **URL**: `/api/fileanalyse`
- **Method**: POST
- **Description**: Uploads a file and returns analysis data about the uploaded file.
- **Request Body**: The request body should contain a single file with the field name `upfile`.
- **Response**: Returns JSON data containing the name, type, size, and content (in base64) of the uploaded file.

#### Example
```json
curl -X POST -F "upfile=@/path/to/file" http://localhost:3000/api/fileanalyse
```

### Response
```json
{
  "name": "example.jpg",
  "type": "image/jpeg",
  "size": 1024,
  "content": "/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAAyAAAJAAA ..."
}
```
### Error Handling

If an error occurs during file upload or processing, the API will respond with an appropriate HTTP status code and an error message in the JSON format.

```json
{
  "error": "File upload failed: File too large"
}
```