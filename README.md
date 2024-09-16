# MicroInvestify: A Web-Based Micro-Investment Platform

<p align="center">Welcome to <strong>MicroInvestify</strong>! 🎊</p>

<br>

![image](https://github.com/user-attachments/assets/d920ffef-7d86-410f-a289-126c8eb80e47)

<br>
a cutting-edge micro-investment platform designed to make investing accessible and engaging for everyone. This platform allows users to invest small amounts in stocks, ETFs, and cryptocurrencies with real-time tracking and personalized recommendations. Enjoy interactive investment animations, real-time data integration, and secure transactions through PayPal.

# 🚀 Features

- **Micro-Investments**:     Invest small amounts in a diverse range of assets.
- **Real-Time Tracking**:    Monitor your investments with live data from Alpha Vantage.
- **Personalized Recommendations**:    Get tailored investment suggestions.
- **Secure Payments**:    Handle transactions with confidence using PayPal.
- **Interactive Animations**:    Visualize your investments with engaging animations.

## Project Demo 

+ For detailed screenshots of the application, visit our [Screenshots Gallery](screenshots.md).
+ Watch the demo video to see MicroInvestify in action: [Project Demo](https://youtu.be/XTxtFoLZuvk?si=tDA7-OXHlWmofan7)



##  🛠️ Tech Stack
*  [React.js](https://legacy.reactjs.org/docs/getting-started.html)
*  [TailwindCSS](https://tailwindcss.com/)
*  [Java 18](https://docs.oracle.com/en/java/javase/17/)         ``` Version (18.0.2.1) ```
*  [Spring Boot](https://docs.spring.io/spring-boot/index.html)       ``` Version (v3.3.3)```
*  [Spring Security](https://docs.spring.io/spring-boot/index.html)
*  [MySQL](https://dev.mysql.com/doc/)
*  [Alpha Vantage](https://www.alphavantage.co/documentation/) - For Stock and Crypto data
*  [PayPal](https://developer.paypal.com/api/rest/) - For Payment Gateway


<h2 style="font-size: 24px; color: #2c3e50; text-align: center; margin-bottom: 20px;">🏗️ System Architecture</h2>
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

## 🛠️ Project Setup

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Java 18**: Install the JDK from [here](https://www.oracle.com/java/technologies/javase-jdk18-downloads.html).
- **MySQL**: Ensure MySQL is set up for database handling.
- **Git**: Version control through GitHub.

### Backend Setup (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/Akshayp02/MicroInvestify.git
2. Navigate to the server-microinvestify
   ```bash
   cd server-microinvestify
3. Configuration

    Before running the application, you need to configure the following:

    1. **Database Details**: Update the `application.properties` file with your database URL, username, and password.
    2. **API Keys**: Add your API keys for services like Alpha Vantage and PayPal in the `application.properties` file.

4. Run the Spring Boot application
   ```bash
   ./mvnw spring-boot:run
### Frontend Setup (React.js)
1. Navigate to client-microinvestify
   ```bash
   cd client-microinvestify
2. Install the dependencies
    ```bash
    npm install
3. Create a .env file in the root of your frontend folder and add your API URL
   ```bash
   REACT_APP_API_URL=http://localhost:8080/api/
4. Run the client-microinvestify app
   ```bash
   npm start
### Database Setup
    CREATE DATABASE microinvestify_db; 

### Running the Project
Ensure both the server-microinvestify and client-microinvestify are running in parallel.
<br>Access the application in your browser at `http://localhost:3000.`


 You're all set to explore MicroInvestify! 🎉






<h2>🛡️ License:</h2>

This project is licensed under the [MIT License](LICENSE).


## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: [akshaypeherkar2002@gmail.com](mailto:akshaypeherkar2002@gmail.com)

I'd love to hear from you! 

If you found this project useful or inspiring, make sure to give it a ⭐️! Your support keeps me growing! 🌟

