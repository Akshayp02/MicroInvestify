# MicroInvestify: A Web-Based Micro-Investment Platform


Welcome to **MicroInvestify**!🎊
<br>

![image](https://github.com/user-attachments/assets/d920ffef-7d86-410f-a289-126c8eb80e47)

<br>
a cutting-edge micro-investment platform designed to make investing accessible and engaging for everyone. This platform allows users to invest small amounts in stocks, ETFs, and cryptocurrencies with real-time tracking and personalized recommendations. Enjoy interactive investment animations, real-time data integration, and secure transactions through PayPal.

## Features

- **Micro-Investments**:     Invest small amounts in a diverse range of assets.
- **Real-Time Tracking**:    Monitor your investments with live data from Alpha Vantage.
- **Personalized Recommendations**:    Get tailored investment suggestions.
- **Secure Payments**:    Handle transactions with confidence using PayPal.
- **Interactive Animations**:    Visualize your investments with engaging animations.

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.3.3, Spring Security, MySQL
- **Frontend**: React.js, Tailwind CSS
- **APIs**: Alpha Vantage (for stock and crypto data), PayPal (for payment gateway)
- **Version Control**: Git, GitHub

<h2 style="font-size: 24px; color: #2c3e50; text-align: center; margin-bottom: 20px;">System Architecture</h2>
<p style="font-size: 12px; line-height: 1.6; color: #34495e; text-align: justify; margin-bottom: 20px;">
    The diagram below outlines the overall architecture of the <strong>Microinvestify</strong>. 
    The platform is designed to enable users to invest in stocks and cryptocurrencies with real-time data integration. 
    The frontend, developed using <strong>React</strong>, interacts with the backend powered by <strong>Spring Boot</strong>, 
    allowing seamless data flow and user authentication. 
    <br><br>
    The backend communicates with external services such as the <strong>Alpha Vantage API</strong> for fetching live stock and 
    cryptocurrency data, and <strong>PayPal API</strong> for secure payment processing. The <strong>MySQL</strong> database is 
    used to store user information, investment data, and transaction history.
    <br><br>
    This architecture ensures a scalable and efficient system for handling micro-investments, real-time market trends, 
    and secure transactions.
</p>

![Microinvestify block correct](https://github.com/user-attachments/assets/435a8bf0-da2d-456c-b278-2d59b145140c)



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


