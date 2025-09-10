# fsn.pw - A Full-Stack URL Shortener

A simple, full-stack URL shortener application built with Node.js, Express, and React.

## Features

*   Create short URLs for long URLs.
*   Optional custom slugs for short URLs.
*   Redirects short URLs to the original URL.
*   Simple and clean user interface.

## Technologies Used

*   **Backend**:
    *   Node.js
    *   Express
    *   MongoDB with `monk`
    *   `nanoid` for generating unique slugs
    *   `yup` for schema validation
*   **Frontend**:
    *   React
    *   Bulmaswatch for styling

## Getting Started

### Prerequisites

*   Node.js and npm installed
*   MongoDB instance running

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Gensune/fsn.pw.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add your MongoDB connection string:
    ```
    MONGODB_URI=mongodb://localhost:27017/your-db-name
    ```

### Running the Application

1.  Start the server:
    ```bash
    npm start
    ```
2.  Or, run in development mode with auto-reloading:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:1337` (or the port specified in your `.env` file).

## API

### `POST /api/slug`

Creates a new short URL.

**Request Body:**

```json
{
  "url": "https://example.com",
  "slug": "custom-slug"
}
```

*   `url` (string, required): The URL to shorten.
*   `slug` (string, optional): A custom slug for the short URL. If not provided, a random one will be generated.

**Response:**

```json
{
  "_id": "...",
  "url": "https://example.com",
  "slug": "custom-slug"
}
```
