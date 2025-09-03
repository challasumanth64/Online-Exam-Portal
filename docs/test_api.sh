#!/bin/bash

# API Testing Script

echo "Testing Online Exam API Endpoints"
echo "================================="

# Test Register
echo "1. Testing Register Endpoint"
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword"
  }'

echo -e "\n\n"

# Test Login
echo "2. Testing Login Endpoint"
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword"
  }'

echo -e "\n\n"

# Test Get Questions
echo "3. Testing Get Questions Endpoint"
curl -X GET http://localhost:5000/api/questions

echo -e "\n\n"

# Test Submit Exam (example)
echo "4. Testing Submit Exam Endpoint"
echo "Note: You need to replace question IDs with actual IDs from the questions endpoint"
curl -X POST http://localhost:5000/api/exam/submit \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "questionId1": "option1",
      "questionId2": "option2"
    }
  }'

echo -e "\n\nAPI Testing Complete!"