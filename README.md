# Library Management App

The **Library Management App** is a web-based platform designed to facilitate the management of books, users, and transactions in a library setting. This project includes a **frontend** built with React and a **backend** powered by Node.js, Express, and MongoDB.

---

## Features

- **Book Management**: Add, update, delete, and view books in the library.
- **User Management**: Register, log in, and manage user profiles.
- **Transaction Management**: Issue and return books with complete transaction history.
- **Secure Authentication**: User authentication using JWT tokens and cookies.
- **Responsive Design**: Fully responsive UI for seamless usage across devices.

---

## Tech Stack

### Frontend:
- **React.js**
- **Redux Toolkit** (State Management)
- **CSS/Bootstrap**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **dotenv** (Environment Variables)
- **cors** (Cross-Origin Resource Sharing)
- **cookie-parser** (Cookie Handling)

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or above)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)
- A modern web browser

### Steps to Run Locally

#### Clone the Repository:
```bash
git clone https://github.com/mohittanwarCod/Library-Management-App.git
cd Library-Management-App
```

#### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

#### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

#### Access the Application:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## Deployment

### Frontend:
The frontend is deployed on [Vercel](https://vercel.com/). Access it at:
[Library Management App Frontend](https://library-management-app-red.vercel.app)

### Backend:
The backend is hosted on a cloud platform (e.g., AWS, Heroku, or Render). Ensure the environment variables are correctly set in the deployment environment.

---

## API Endpoints

### Base URL: `/api/v1`

#### Books:
- `GET /books`: Get all books.
- `POST /books`: Add a new book.
- `PUT /books/:id`: Update a book.
- `DELETE /books/:id`: Delete a book.

#### Users:
- `POST /user/register`: Register a new user.
- `POST /user/login`: Login a user.
- `GET /user/profile`: Get user profile (requires authentication).

#### Transactions:
- `POST /transaction/issue`: Issue a book.
- `POST /transaction/return`: Return a book.
- `GET /transaction/history`: Get transaction history.

---

## Known Issues

- Ensure CORS is correctly configured for both frontend and backend during deployment.
- Tokens might not persist in cookies if `secure` or `sameSite` attributes are misconfigured in production.

---

## Contributing

Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

- **Author**: Mohit Tanwar
- **GitHub**: [@mohittanwarCod](https://github.com/mohittanwarCod)
- **Deployed App**: [Library Management App](https://library-management-app-red.vercel.app)

Feel free to open an issue or reach out for any queries or suggestions!
