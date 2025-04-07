import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import farmImage from "../assets/farmImage.png";
import "../styles/PersonalInfo.css"

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

const PersonalInformation= () => {
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
    <div className="infologo-container">
      <div className="infomain-frame">
        <form className="infoform-section" onSubmit={handleSubmit(onSubmit)}>
          <h2>Personal Information</h2>
          <div className="infoform-row">
            <div className="infoform-grid">
              <div className="infoform-columnleft">
                <div className="form-group photo-group">
                  <label>Photo <span className="required">*</span></label>
                  <div className="photo-box">Photo</div>
                </div>

                <div className="infoform-group">
                  <label>First Name <span className="required">*</span></label>
                  <input type="text" {...register("firstName")} />
                  <p className="error">{errors.firstName?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Middle Name <span className="required">*</span></label>
                  <input type="text" {...register("middleName")} />
                  <p className="error">{errors.middleName?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Last Name <span className="required">*</span></label>
                  <input type="text" {...register("lastName")} />
                  <p className="error">{errors.lastName?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Gender <span className="required">*</span></label>
                  <select {...register("gender")}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                  <p className="error">{errors.gender?.message}</p>
                </div>
              </div>

              <div className="infoform-columnright">
                <div className="infoform-group">
                  <label>Select <span className="required">*</span></label>
                  <div className="infocheckbox-group">
                    <label><input type="checkbox" {...register("select")} value="D/O" /> D/O</label>
                    <label><input type="checkbox" {...register("select")} value="S/O" /> S/O</label>
                    <label><input type="checkbox" {...register("select")} value="W/O" /> W/O</label>
                  </div>
                </div>

                <div className="infoform-group">
                  <label>Father Name <span className="required">*</span></label>
                  <input type="text" {...register("fatherName")} />
                  <p className="error">{errors.fatherName?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Alternative Number <span className="required">*</span></label>
                  <input type="text" {...register("alternativeNumber")} />
                  <p className="error">{errors.alternativeNumber?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Alternative No. Type <span className="required">*</span></label>
                  <input type="text" {...register("alternativeType")} />
                  <p className="error">{errors.alternativeType?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>Nationality <span className="required">*</span></label>
                  <select {...register("nationality")}>
                    <option value="">Select</option>
                    <option value="Indian">Indian</option>
                  </select>
                  <p className="error">{errors.nationality?.message}</p>
                </div>

                <div className="infoform-group">
                  <label>DOB <span className="required">*</span></label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register("dob")} />
                  <p className="error">{errors.dob?.message}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button type="submit" className="infosubmit-btn">Submit</button>
         
        </form>

        <div className="infoimage-section">
          <img src={farmImage} alt="Farm Field" className="infofarm-image" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
