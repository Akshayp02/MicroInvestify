# MicroInvestify: A Full-Stack Micro-Investment Platform

Welcome to **MicroInvestify**, a cutting-edge micro-investment platform designed to make investing accessible and engaging for everyone. Our platform allows users to invest small amounts in stocks, ETFs, and cryptocurrencies with real-time tracking and personalized recommendations. Enjoy interactive investment animations, real-time data integration, and secure transactions through PayPal.

## Features

- **Micro-Investments**: Invest small amounts in a diverse range of assets.
- **Real-Time Tracking**: Monitor your investments with live data from Alpha Vantage.
- **Personalized Recommendations**: Get tailored investment suggestions.
- **Secure Payments**: Handle transactions with confidence using PayPal.
- **Interactive Animations**: Visualize your investments with engaging animations.

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.3.3, Spring Security, MySQL
- **Frontend**: React.js, Tailwind CSS
- **APIs**: Alpha Vantage (for stock and crypto data), PayPal (for payment gateway)
- **Version Control**: Git, GitHub

## Project Architecture

### High-Level Architecture

1. **Frontend (React.js)**:
   - **Landing Page**: Engaging introduction and call-to-action.
   - **Dashboard**: Overview of investments and quick actions.
   - **My Portfolio**: Detailed view of investments with charts.
   - **Investment Suggestions**: Personalized recommendations and news.
   - **Market Trends**: Real-time data and interactive charts.
   - **Education Page**: Educational resources and progress tracking.

2. **Backend (Spring Boot)**:
   - **API Layer**: Handles requests from the frontend, processes them, and communicates with the database.
   - **Service Layer**: Contains business logic for handling investments, transactions, and data retrieval.
   - **Data Access Layer**: Manages interactions with the MySQL database.

3. **APIs**:
   - **Alpha Vantage**: Fetches real-time and historical stock and cryptocurrency data.
   - **PayPal**: Manages secure transactions for investments and withdrawals.

### Blueprint

#### Frontend
1. **React Application**: Components for each page (Landing, Dashboard, Portfolio, etc.).
2. **State Management**: Redux for handling application state.
3. **Styling**: Tailwind CSS for responsive and modern design.
4. **Animations**: Interactive animations for investment visualizations.

#### Backend
1. **Spring Boot Application**: Provides RESTful APIs for frontend interaction.
2. **Security**: Spring Security for user authentication and authorization.
3. **Database**: MySQL for storing user data and investment information.
4. **Services**: Handles business logic and integrates with external APIs.

#### Integration
1. **Alpha Vantage**: Integrated for real-time stock and crypto data retrieval.
2. **PayPal**: Integrated for secure payment processing.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <https://github.com/Akshayp02/MicroInvestify.git>
   cd MicroInvestify
2. **Install Dependencies**:

For the frontend:

```bash

cd client-microinvestify
npm install


3. **For the backend:**

bash
Copy code
cd backend
./mvnw install
Run the Application:

Start the backend server:

bash
Copy code
cd backend
./mvnw spring-boot:run
Start the frontend development server:

bash
Copy code
cd frontend
npm start

```
Access the Application: Open your browser and navigate to http://localhost:3000 to view the React application.

Contributing
Contributions are welcome! Please see the CONTRIBUTING.md for details.

License
This project is licensed under the MIT License - see the LICENSE file for details.


