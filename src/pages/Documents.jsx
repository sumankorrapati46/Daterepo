import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import farmImage from "../assets/farmImage.png";
import "../styles/Documents.css"


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  salutation: Yup.array().min(1, "Select at least one salutation"),
  nationality: Yup.string().required("Nationality is required"),
  dob: Yup.string()
    .required("Date of Birth is required")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "DOB must be in DD/MM/YYYY format"),
  fatherName: Yup.string().required("Father Name is required"),
  alternativeNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
    .required("Alternative Number is required"),
  alternativeType: Yup.string().required("Alternative No. Type is required"),
});

const Documents= () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    axios
      .get("https://api.example.com/user/1")
      .then((response) => {
        const userData = response.data;
        setValue("firstName", userData.firstName);
        setValue("middleName", userData.middleName);
        setValue("lastName", userData.lastName);
        setValue("gender", userData.gender);
        setValue("nationality", userData.nationality);
        setValue("dob", userData.dob);
        setValue("fatherName", userData.fatherName);
        setValue("alternativeNumber", userData.alternativeNumber);
        setValue("alternativeType", userData.alternativeType);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    try {
      const response = await axios.post("https://api.example.com/user/update", data);
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };
  return (
    <div className="doccontainer">

      <div className="doccontent">
      
        <div className="docform-container">
            
          <h2>Documents</h2>
          <label className="label">
            Add Document <span className="required">*</span>
          </label>
          <select className="docinput">
            <option>Select</option>
            <option>ID/ Voter Card</option>
            <option>Aadhar Number</option>
            <option>Pan Number</option>
            <option>Ppb Number</option>
          </select>
          <input type="text" placeholder="ID/ Voter Card" className="input" />
          <input type="text" placeholder="Aadhar Number" className="input" />
          <input type="text" placeholder="Pan Number" className="input" />
          <input type="text" placeholder="Ppb Number" className="input" />

          
          <label className="doclabel">Passbook</label>
          <div className="docupload-box">Photo/ File</div>
        </div>

        <div className="docimage-container">
        <img src={farmImage} alt="Farm Field" className="docfarm-image" />
        
        </div>
      </div>
    </div>
  );
};

export default Documents;
