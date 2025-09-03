# API Testing Guide

This document provides curl commands to test the Online Exam API endpoints.

## Prerequisites

- Make sure the backend server is running on `http://localhost:5000`
- MongoDB should be connected

## Auth Endpoints

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword"
  }'
```

### Login an existing user

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword"
  }'
```

## Questions Endpoints

### Get random questions for the exam

```bash
curl -X GET http://localhost:5000/api/questions
```

## Exam Endpoints

### Submit exam answers and get score

```bash
curl -X POST http://localhost:5000/api/exam/submit \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "questionId1": "option1",
      "questionId2": "option2"
    }
  }'
```

## Using the Postman Collection

1. Open Postman
2. Click on "Import" button
3. Select the `Online Exam API.postman_collection.json` file from the `docs` folder
4. The collection will be imported with all the endpoints
5. You can now test the endpoints directly from Postman