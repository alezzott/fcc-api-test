# Request Header Parser Microservice

## Overview
The Who Am I API provides information about the user's IP address, preferred language, and user agent (software) based on the incoming request.

## Endpoint

### 1. Retrieve User Information

- **URL**: `/api/whoami`
- **Method**: GET
- **Description**: Retrieves information about the user's IP address, preferred language, and user agent (software) based on the incoming request.
- **Response**: Returns JSON data containing the user's IP address (`ipaddress`), preferred language (`language`), and user agent (`software`).

#### Example
```bash
curl http://localhost:3000/api/whoami
```

#### Response
```json
{
  "ipaddress": "127.0.0.1",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
}
```

### Error Handling

If an error occurs during the request processing, the API will respond with an appropriate HTTP status code and an error message in the JSON format.

```json
{
  "error": "Internal Server Error"
}
```