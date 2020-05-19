# Http Requests Documentation

# POST /v1/consumers/{id}
# creates consumer user

Request Body:
{
  "firstName": string,
  "lastName": string,
  "email": string,
  "country": string, #enum: [Canada, United States]
  "locationId": string,
  "mobileNum": string
}

Success Response Body:
  Null

Response Codes:
  Created (success): 201
  Permission denied (invalid api key): 403
  Invalid content type in header (not application/json): 400
  Invalid request body argument: 400
  Consumer user with same id/email/mobile number already exists: 409

# PUT /v1/consumers/{id}
# updates consumer user

Request Body:
{
  "firstName": string,
  "lastName": string,
  "email": string,
  "country": string, #enum: [Canada, United States]
  "locationId": string,
  "mobileNum": string
}

Success Response Body:
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "country": string,
  "locationId": string,
  "mobileNum": string,
  "verificationStatus": boolean
}

Response Codes:
  Updated (success): 200
  Permission denied (invalid api key): 403
  Invalid content type in header (not application/json): 400
  Invalid request body argument: 400
  Consumer user with same id/email/mobile number already exists: 409

# GET /v1/consumers/{id}
# gets consumer user

Request Body:
  None

Success Response Body:
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "country": string,
  "locationId": string,
  "mobileNum": string,
  "verificationStatus": boolean
}

Response Codes:
  Return (success): 200
  Permission denied (invalid api key): 403
  User not found given id: 404

# DELETE /v1/consumers/{id}
# deletes consumer user

Request Body:
  None

Success Response Body:
  Null

Response Codes:
  No content (success): 204
  Permission denied (invalid api key): 403
  User not found given id: 404

# Error Responses

All error responses are of the form:

{
  "error": {
    "message": string,
    "details": string,
    "status": string
  }
}
