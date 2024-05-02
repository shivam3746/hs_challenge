# Transaction Management FullStack Level 1
# Running Frontend and Backend

This guide outlines the steps to run both frontend and backend folders of your application.

## Prerequisites

- Node.js and npm installed on your machine.
- Git installed for cloning the repository.

## Setup

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the cloned repository:

    ```bash
    cd <repository_name>
    ```

## Frontend

### Installation

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running the Frontend

1. Start the frontend development server:

    ```bash
    npm run dev -- -o
    ```

2. The frontend application will be accessible at `http://localhost:3000` in your browser.

## Backend

### Installation

1. Navigate to the backend directory:

    ```bash
    cd ../backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running the Backend

1. Start the backend server:

    ```bash
    npm start
    ```

    OR

    ```bash
    node server.js
    ```

2. The backend server will be running at `http://localhost:8080`.

## Routes

### GET /ping

- Description: Ping endpoint to check if the service is up and running.
- Response: JSON object with a message indicating the service status.

### POST /transactions

- Description: Endpoint to create a new transaction.
- Request Body:
  - account_id (string): ID of the account involved in the transaction.
  - amount (number): Amount of the transaction.
- Response: JSON object representing the newly created transaction.
- Error Response: 400 with a JSON object containing an error message if mandatory body parameters are missing or have an incorrect type.

### GET /transactions

- Description: Endpoint to retrieve all transactions.
- Response: JSON array containing all transactions.

### GET /transactions/:transaction_id

- Description: Endpoint to retrieve a specific transaction by its ID.
- Path Parameter:
  - transaction_id (string): ID of the transaction to retrieve.
- Response: JSON object representing the requested transaction.
- Error Response: 404 with a JSON object containing an error message if the transaction is not found.

### GET /accounts/:account_id

- Description: Endpoint to retrieve an account by its ID.
- Path Parameter:
  - account_id (string): ID of the account to retrieve.
- Response: JSON object representing the requested account.
- Error Response: 400 with a JSON object containing an error message if the account ID is missing or has an incorrect type, or 404 if the account is not found.

### GET /positiveAccounts

- Description: Endpoint to retrieve all accounts with a positive balance.
- Response: JSON array containing all accounts with a positive balance.

### GET /negativeAccounts

- Description: Endpoint to retrieve all accounts with a negative balance.
- Response: JSON array containing all accounts with a negative balance.

### GET /allAccounts

- Description: Endpoint to retrieve all accounts.
- Response: JSON array containing all accounts.



## Testing

To test the application, ensure both frontend and backend servers are running, and then perform testing as required.

## Conclusion

You have successfully set up and run both frontend and backend folders of your application.

