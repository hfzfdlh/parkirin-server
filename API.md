## Endpoints

List of Available Endpoints for Users:
- `POST/users/login`
- `POST/users/google-login`
- `POST/users/register`
- `GET/users/user`
- `GET/users/transactions`
- `GET/users/active-transactions`
- `POST/users/parking`
- `POST/users/generate-midtrans-token`
- `PATCH/users/add-money`
- `PATCH/users/red-money`
- `PUT/users/edit-user`
- `POST/users/oreder-park/:RenterId`

List of Available Endpoints for Renters:
- `POST/renters/login`
- `POST/renters/google-login`
- `POST/renters/register`


### POST /users/login
#### Description
- send input to check for login

#### Request
- Body
    ```js
    {
        "email":<string>,
        "password":<string>,
    }
    ```


#### Response
- status 200:
    ```js
    {
        "access_token":<string>
    }
    ```

- status 400:
    ```js
    {
        "message": "Email cannot be empty"
    }
    ```

- status 401:
    ```js
    {
        "message": "Invalid email/password"
    }
    ```

### POST /users/google-login
#### Description
- send input to check for login using Google API

#### Request
- Headers
    ```js
    {
        "google_token":<string>,
    }
    ```


#### Response
- status 200:
    ```js
    {
        "access_token":<string>,
    }
    ```
- status 201:
    ```js
    {
        "access_token":<string>,
    }
    ```

### POST /users/register
#### Description
- register a new user

#### Request
- Body
    ```js
    {
        "email":<string>,
        "password":<string>,
        "name":<string>,
        "phoneNumber":<string>,
        "address":<string>,
        "photoUrl":<file>
    }
    ```


#### Response
- status 201:
    ```js
    {
        id: <integer>,
        email:<string>
    }
    ```

- status 400:
    ```js
    {
        "message": "Email cannot be empty"
    }
    ```

### GET /users/user
#### Description
- Get data on the logged in user

#### Request
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 200:
    ```js
    
    {
        "id": 2,
        "email": "Vaporfly 12",
        "password": "Sepatu Nike",
        "UserProfile": <Object>
        
    }
    

    ```

### GET /users/transactions
#### Description
- Get all data of transactions of the logged in user

#### Request
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 200:
    ```js
    [
    {
        "id": 1,
        "UserId": 1,
        "RenterId": 2,
        "paid": 2000,
        "status":"Active",
        "Renter":<Object>
        
    },
    {
        "id": 2,
        "UserId": 1,
        "RenterId": 3,
        "paid": 2000,
        "status":"Finished",
        "Renter":<Object>
        
    },
    ]

    ```

### GET /users/active-transactions
#### Description
- Get all data of transactions with status active of the logged in user

#### Request
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 200:
    ```js
    [
    {
        "id": 1,
        "UserId": 1,
        "RenterId": 2,
        "paid": 2000,
        "status":"Active",
    },
    {
        "id": 2,
        "UserId": 1,
        "RenterId": 4,
        "paid": 4000,
        "status":"Active",
    }
    ]

    ```

### POST /users/parking
#### Description
- get data of all available parking spot within 2 km radius

#### Request
- Body
    ```js
    {
        "lat":<float>,
        "lng":<float>,
    }
    ```
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 200:
    ```js
    [
    {
        "name": "Parkiran pak adam",
        "lat": 6.94736,
        "lng": 120.5636,
        "photoUrl": "http://uifhaegare.com/img",
        "price":2000,
        "RenterId":2,
        "Renter":<Object>
    }
    ]
    ```

### POST /users/generate-midtrans-token
#### Description
- generate midtrans token for payment

#### Request
- Body
    ```js
    {
        "money":<integer>
    }
    ```
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 201:
    ```js
    
    {
       "token":<string>,
       "redirect_url":<string>
    }
    
    ```

### PATCH /users/add-money
#### Description
- patch money column of the user, adding the money

#### Request
- Body
    ```js
    {
        "money":<integer>
    }
    ```
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```

#### Response
- status 200:
    ```js
    
    {
       "message":"Uang berhasil ditambahkan"
    }
    
    ```

### PATCH /users/red-money
#### Description
- patch money column of the user, reducing the money

#### Request
- Body
    ```js
    {
        "money":<integer>
    }
    ```
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```

#### Response
- status 200:
    ```js
    
    {
       "message":"Uang berhasil dikurangkan"
    }
    
    ```

### PUT /products/:id
#### Description
- Update user's data


#### Request
- headers
    ```js
    {
        "access_token":<string>,

    }
    ```

- Body
    ```js
    {
        "name":<string>,
        "phoneNumber":<string>,
        "address":<string>,
        "photoUrl":<file>
    }
    ```
#### Response
- status 200:
    ```js
    
    {
       "message":"User Updated"
    }
    
    ```

### POST /users/order-park/:RenterId
#### Description
- make an order and fill transaction table

#### Request
- Body
    ```js
    {
        "money":<integer>
    }
    ```
- Params
    ```js
    {
        "RenterId":<integer>
    }
    ```
- Headers
    ```js
    {
        "access_token":<string>
    }
    ```


#### Response
- status 201:
    ```js
    
    {
       "message":"Transaction Successful"
    }
    
    ```

### Global message

#### Response
- status 500:
    ```js
    {
        "message":"Internal server error"
    }
    ```

- status 403:
    ```js
    {
        "message":"Invalid token"
    }
    ```























    
    