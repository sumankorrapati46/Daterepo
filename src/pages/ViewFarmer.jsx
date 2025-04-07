import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import farmImage from "../assets/farmImage.png";
import '../styles/ViewFarmer.css';  

const ViewFarmer = () => {
  return (
    <div className="view-farmer-container">

     
      <div className="viewcontent-container">
        <div className="viewtext-section">
          <h2>View Farmer</h2>
          <p><strong>All Fields<span className="required">*</span></strong></p>
        </div>
        <div className="viewimage-section">
          <img src={farmImage} alt="Farm Field" className="viewfarm-image" />
        </div>
      </div>
    </div>
  );
};

export default ViewFarmer;
