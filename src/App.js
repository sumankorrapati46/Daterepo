import React, { useState } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from "react-router-dom";
import logo1 from "./assets/leftlogo.png";
import logo2 from "./assets/rightlogo.png";
import PersonalInformation from "./pages/PersonalInformation";
import ProfessionalInfo from "./pages/ProfessionalInfo";
import Currentcrop from "./pages/Currentcrop";
import Address from "./pages/Address";
import Proposed from "./pages/Proposed";
import Irrigation from "./pages/Irrigation";
import Other from "./pages/Other";
import Documents from "./pages/Documents";
import PortalAccess from "./pages/Portal";
import ViewFarmer from "./pages/ViewFarmer";
import RegistrationForm from "./pages/RegistrationForm";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ForgotUsername from "./pages/ForgotUsername";
import "./App.css";

const Dashboard = () => (
  <div className="container">
    <center>
      <h1>Welcome to DATE Dashboard</h1>
      <button>
        <a href="/personalInfo">Continue</a>
      </button>
    </center>
  </div>
);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


function Layout({ children }) {
  return (
    <div className="infologo-container">
     
      <header className="infotop-bar">
        <img src={logo1} alt="Digital Agristack Logo" className="infologo-left" />
        <img src={logo2} alt="DATE Logo" className="infologo-right" />
      </header>

     
      <div className="infomiddle-container">
        <nav className="infonav-links">
          <a href="/personalInfo">🏛️ Personal Information</a>
          <a href="/address">📌 Address</a>
          <a href="/professionalInfo">👨‍🌾 Professional Information</a>
          <a href="/currentcrop">🌱 Current Crop Information</a>
          <a href="/proposed">🌾 Proposed Crop Information</a>
          <a href="/irrigation">💧 Irrigation Details</a>
          <a href="/other">🔍 Other Information</a>
          <a href="/documents">📄 Documents</a>
          <a href="/portal-access">🛂 Portal Access</a>
          <a href="/viewFarmer">🚜 View Farmer</a>
        </nav>
      </div>

      
      <div className="content-container">{children}</div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const noFrameRoutes = ["/login", "/register", "/forgot-username", "/forgot-password"];

  return (
    <Routes>
    
      {noFrameRoutes.map((path) => (
        <Route key={path} path={path} element={getPageComponent(path)} />
      ))}

      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/personalInfo" element={<PersonalInformation />} />
              <Route path="/ProfessionalInfo" element={<ProfessionalInfo />} />
              <Route path="/currentcrop" element={<Currentcrop />} />
              <Route path="/address" element={<Address />} />
              <Route path="/proposed" element={<Proposed />} />
              <Route path="/irrigation" element={<Irrigation />} />
              <Route path="/other" element={<Other />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/portal-access" element={<PortalAccess />} />
              <Route path="/viewFarmer" element={<ViewFarmer />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}


function getPageComponent(path) {
  switch (path) {
    case "/login":
      return <Login />;
    case "/register":
      return <RegistrationForm />;
    case "/forgot-username":
      return <ForgotUsername />;
    case "/forgot-password":
      return <ForgotPassword />;
    default:
      return null;
  }
}

export default App;
