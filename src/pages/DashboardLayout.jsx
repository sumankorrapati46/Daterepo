import React from "react";
import PersonalInformationForm from "./PersonalInformationForm";
import "./styles.css";

const DashboardLayout = () => {
  return (
    <div className="full-frame">
    
      <div className="top-container">
        <div className="top-frame left">Digital Agristack</div>
        <div className="top-frame center">
          <nav className="navigation">
            <a href="#">Address</a>
            <a href="#">Professional Information</a>
            <a href="#">Current Crop Information</a>
          </nav>
        </div>
        <div className="top-frame right">DATE</div>
      </div>

     
      <div className="bottom-container">
        <div className="bottom-frame left">
          <PersonalInformationForm />
        </div>
        <div className="bottom-frame right">
          <img
            src="/assets/farming-image.jpg"
            alt="Farming Process"
            className="farming-image"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
