import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FarmerForm from "./pages/Formerform";
import Login from "./pages/Login";
import Register from "./pages/RegistrationForm";
import ForgotUsername from "./pages/ForgotUsername";
import ForgotPassword from "./pages/ForgotPassword";
import logo1 from "./assets/leftlogo.png";
import logo2 from "./assets/rightlogo.png";
import "./App.css"

// Layout Component
function Layout({ children, currentStep = 0 }) {
  const steps = [
    "🏛️ Personal Information",
    "📌 Address",
    "👨‍🌾 Professional Information",
    "🌱 Current Crop Information",
    "🌾 Proposed Crop Information",
    "💧 Irrigation Details",
    "🔍 Other Information",
    "📄 Documents",
  ];

  return (
    <div className="infologo-container">
      <header className="infotop-bar">
        <img src={logo1} alt="Digital Agristack Logo" className="infologo-left" />
        <img src={logo2} alt="DATE Logo" className="infologo-right" />
      </header>

      <div className="infomiddle-container">
        <nav className="infonav-links">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`infonav-item ${index === currentStep ? "active" : ""}`}
            >
              {label}
            </div>
          ))}
        </nav>
      </div>

      <div className="content-container">{children}</div>
    </div>
  );
}

// AppContent to handle routes
function AppContent() {
  const location = useLocation();
  const noFrameRoutes = ["/login", "/register", "/forgot-username", "/forgot-password"];

  if (noFrameRoutes.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-username" element={<ForgotUsername />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    );
  }

  // Main layout route
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <FarmerFormWrapper />
        }
      />
    </Routes>
  );
}

// Wrapper to pass currentStep to Layout
function FarmerFormWrapper() {
  const [step, setStep] = React.useState(0);

  return (
    <Layout currentStep={step}>
      <FarmerForm setCurrentStep={setStep} />
    </Layout>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
