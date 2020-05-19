## Profile Service Endpoints

## Consumer Api

### POST /v1/consumers/{id}

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, # one of: Canada, United States
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
    409: Consumer with same id/email/mobile number already exists

### PUT /v1/consumers/{id}

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, # one of: Canada, United States
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
    409: Consumer with same id/email/mobile number already exists

### GET /v1/consumers/{id}

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
    404: Consumer not found given id

### DELETE /v1/consumers/{id}

#### Request Body:
    None

#### Success Response Body:
    Null

#### Response Codes:
    204: No content (success)
    403: Permission denied (invalid api key)
    404: Consumer not found given id

## Courier Api

### POST /v1/couriers/{id}

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, # one of: Canada, United States
      "locationId": string,
      "mobileNum": string,
      "vehicleType": string
    }

#### Success Response Body:
    Null

#### Response Codes:
    201: Created (success)
    403: Permission denied (invalid api key)
    400: Invalid content type in header (not application/json)
    400: Invalid request body argument
    409: Courier with same id/email/mobile number already exists

### PUT /v1/couriers/{id}

#### Request Body:
    {
      "firstName": string,
      "lastName": string,
      "email": string,
      "country": string, # one of: Canada, United States
      "locationId": string,
      "mobileNum": string,
      "vehicleType": string
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
      "vehicleType": string,
      "verificationStatus": boolean
    }

#### Response Codes:
    201: Created (success)
    403: Permission denied (invalid api key)
    400: Invalid content type in header (not application/json)
    400: Invalid request body argument
    409: Courier with same id/email/mobile number already exists

### GET /v1/couriers/{id}

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
      "vehicleType": string,
      "verificationStatus": boolean
    }

#### Response Codes:
    200: Return (success)
    403: Permission denied (invalid api key)
    404: Courier not found given id

### DELETE /v1/couriers/{id}

#### Request Body:
    None

#### Success Response Body:
    Null

#### Response Codes:
    204: No content (success)
    403: Permission denied (invalid api key)
    404: Courier not found given id

### Error Responses
#### All error responses are of the form:
    {
      "error": {
        "message": string,
        "details": string,
        "status": string
      }
    }
