## Profile Service Endpoints

### POST /v1/consumers/{id}
#### Creates consumer user

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, #enum: [Canada, United States]
      "locationId": string,
      "mobileNum": string
    }

#### Success Response Body:
    Null

#### Response Codes:
    201: Created (success)
    403: Permission denied (invalid api key)
    400: Invalid content type in header (not application/json)
    400: Invalid request body argument
    409: Consumer user with same id/email/mobile number already exists

### PUT /v1/consumers/{id}
#### Updates consumer user

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, #enum: [Canada, United States]
      "locationId": string,
      "mobileNum": string
    }   

#### Success Response Body:
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

#### Response Codes:
    201: Created (success)
    403: Permission denied (invalid api key)
    400: Invalid content type in header (not application/json)
    400: Invalid request body argument
    409: Consumer user with same id/email/mobile number already exists

### GET /v1/consumers/{id}
#### Gets consumer user

#### Request Body:
    None

#### Success Response Body:
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

#### Response Codes:
    200: Return (success)
    403: Permission denied (invalid api key)
    404: User not found given id

### DELETE /v1/consumers/{id}
#### Deletes consumer user

#### Request Body:
    None

#### Success Response Body:
    Null

#### Response Codes:
    200: Return (success)
    403: Permission denied (invalid api key)
    404: User not found given id

### Error Responses
#### All error responses are of the form:
    {
      "error": {
        "message": string,
        "details": string,
        "status": string
      }
    }
