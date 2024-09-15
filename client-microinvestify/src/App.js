import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import LandingPage from "./Components/Landingpage";
import Footer from "./Components/Footer";
import Dashbord from "./Components/Dashbord";
import MyPortfolio from "./Components/Myportfolio";
import SuggestInv from "./Components/SuggestInv";
import MarketTrend from "./Components/MarketTrend";
import Education from "./Components/Education";
import Settings from "./Components/Settings";
import PaymentDeposit from "./Components/PaymentDeposit";
import SuccessPayment from "./Components/SuccessPayment";
import CancelPayment from "./Components/CancelPayment";
import ErrorPayment from "./Components/ErrorPayment";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <main className="flex-grow bg-background-light">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/my-portfolio" element={<MyPortfolio />} />
             <Route path="/suggestions" element={<SuggestInv />}/>
             <Route path="/trends" element={<MarketTrend />} />
             <Route path="/education" element={<Education />} />
             <Route path="/payment-success" element={<SuccessPayment />} />
             <Route path="/payment-cancel" element={<CancelPayment />} />
              <Route path="/payment-error" element={<ErrorPayment />} />
      
          <Route path="/settings" element={<Settings />} /> 

          <Route path="/payment" element={<PaymentDeposit/>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
