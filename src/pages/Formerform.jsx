import React, { createContext, useContext, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import farmImage from "../assets/farmImage.png";
import "../styles/Farmerform.css";

const steps = [
  "Personal Information",
  "Address",
  "Professional Information",
  "Current Crop Information",
  "Proposed Crop Information",
  "Irrigation Details",
  "Other Information",
  "Documents",
  "Portal Access",
  "View Farmer",
];

const validationSchemas = [
  Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    salutation: Yup.string().required("Salutation is required"),
    nationality: Yup.string().required("Nationality is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, "DOB must be in DD/MM/YYYY format"),
    fatherName: Yup.string().required("Father Name is required"),
    alternativeNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
      .required("Alternative Number is required"),
    alternativeType: Yup.string().required("Alternative No. Type is required"),
  }),

  Yup.object().shape({
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    block: Yup.string().required("Block (mandal) is required"),
    village: Yup.string().required("Village is required"),
    zipcode: Yup.string()
      .required("Zipcode is required")
      .matches(/^\d{6}$/, "Zipcode must be 6 digits"),
  }),

  Yup.object().shape({
    education: Yup.string().required("Education is required"),
    experience: Yup.string().required("Experience is required"),
  }),

  Yup.object().shape({
    surveyNumber: Yup.string().required("Survey Number is required"),
    totalLandHolding: Yup.string().required("Total Land Holding is required"),
    geoTag: Yup.string().required("Geo-tag is required"),
    selectCrop: Yup.string().required("Crop selection is required"),
    netIncome: Yup.string().required("Net Income is required"),
    soilTest: Yup.string().required("Soil Test is required"),
    soilTestCertificate: Yup.mixed().required("Soil Test Certificate is required"),
  }),

  Yup.object().shape({
    surveyNumber: Yup.string().required("Survey Number is required"),
    geoTag: Yup.string().required("Geo-tag is required"),
    cropType: Yup.string().required("Crop Type is required"),
    soilTest: Yup.string().required("Soil Test selection is required"),
    totalLandHolding: Yup.string().required("Total Land Holding is required"),
    netIncome: Yup.string().required("Net Income is required"),
    soilTestCertificate: Yup.mixed().required("Soil Test Certificate is required"),
  }),

  Yup.object().shape({
    waterSource: Yup.string().required("Water Source is required"),
    borewellDischarge: Yup.string().required("Borewell Discharge is required"),
    summerDischarge: Yup.string().required("Summer Discharge is required"),
    borewellLocation: Yup.string().required("Borewell Location is required"),
  }),

  Yup.object().shape({
    bankName: Yup.string().required("Bank Name is required"),
    accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, "Account Number must be 9-18 digits")
    .required("Account Number is required"),
    branchName: Yup.string().required("Branch Name is required"),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC Code")
      .required("IFSC Code is required"),
    passbookFile: Yup.mixed().required("Passbook file is required"),
  }),

  Yup.object().shape({
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
  }),

  Yup.object().shape({
    role: Yup.string().required("Role/Designation is required"),
    access: Yup.string().required("Access selection is required"),
  }),

  Yup.object().shape({
    bankName: Yup.string().required("Bank Name is required"),
    accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, "Account Number must be 9-18 digits")
    .required("Account Number is required"),
    branchName: Yup.string().required("Branch Name is required"),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC Code")
      .required("IFSC Code is required"),
    passbookFile: Yup.mixed().required("Passbook file is required"),
  }),
];

const FarmerForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({
    resolver: yupResolver(validationSchemas[currentStep]),
    mode: "onBlur",
  });

  const { register,handleSubmit, trigger, formState: { errors }, setValue } = methods;

  const onSubmit = async (data) => {
    if (currentStep < steps.length - 1) {
      const valid = await trigger();
      if (valid) setCurrentStep((prev) => prev + 1);
    } else {
      alert("Submitting full form...");
      console.log("Form submitted:", data);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentStep === 0) {
      axios.get("https://api.example.com/user/1")
        .then((res) => {
          const fields = Object.keys(res.data);
          fields.forEach((field) => setValue(field, res.data[field]));
        })
        .catch((err) => console.error("Data fetch error:", err));
    }
  }, [currentStep, setValue]);

    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result); 
        };
        reader.readAsDataURL(file);
      }
    };


            

  return (
    <div className="form-wrapper">
        <div className="form-full"> 
        <h2>{steps[currentStep]}</h2>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && ( 
              <> 
              <div className="form-grid"> 
              <div className="field-left">
                <div className="form-group photo-group">
                  <label>Photo <span className="required">*</span></label>
                   <div className="photo-box" onClick={() => document.getElementById("photoInput").click()}>
                     {photo ? (
                     <img src={photo} alt="Uploaded" className="preview-img" />
                      ) : (
                      "Click to upload"
                      )}
                    </div>
                   <input type="file" accept="image/*" id="photoInput" onChange={handlePhotoChange} style={{ display: "none" }} />
                </div>
                <label>First Name <span className="required">*</span>
                  <input {...register("firstName")} />
                </label>
                <p>{errors.firstName?.message}</p>

                <label>Middle Name <span className="required">*</span>
                  <input {...register("middleName")} />
                </label>
                <p>{errors.middleName?.message}</p>

                <label>Last Name <span className="required">*</span>
                  <input {...register("lastName")} />
                </label>
                <p>{errors.lastName?.message}</p>

                <label>Gender <span className="required">*</span>
                  <select {...register("gender")}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </label>
                <p>{errors.gender?.message}</p>
                 </div>

                <div className="field-right">
                <label>Salutation <span className="required">*</span>
                  <select {...register("salutation")}>
                    <option value="">Select Salutation</option>
                    <option value="D/O">D/O</option>
                    <option value="S/O">S/O</option>
                    <option value="W/O">W/O</option>
                  </select>
                </label>
                <p>{errors.salutation?.message}</p>

                <label>Nationality <span className="required">*</span>
                  <input {...register("nationality")} />
                </label>
                <p>{errors.nationality?.message}</p>

                <label>Date of Birth (DD/MM/YYYY) <span className="required">*</span>
                  <input {...register("dob")} />
                </label>
                <p>{errors.dob?.message}</p>

                <label>Father Name <span className="required">*</span>
                  <input {...register("fatherName")} />
                </label>
                <p>{errors.fatherName?.message}</p>

                <label>Alternative Number <span className="required">*</span>
                  <input {...register("alternativeNumber")} />
                </label>
                <p>{errors.alternativeNumber?.message}</p>

                <label>Alternative Type <span className="required">*</span>
                  <input {...register("alternativeType")} />
                </label>
                <p>{errors.alternativeType?.message}</p>
                </div>
                </div>
               </> 
              
            )}

            {currentStep === 1 && (
                
              <div className="address-field">
                <label>Country <span className="required">*</span>
                  <input {...register("country")} />
                </label>
                <p>{errors.country?.message}</p>

                <label>State <span className="required">*</span>
                  <input {...register("state")} />
                </label>
                <p>{errors.state?.message}</p>

                <label>District <span className="required">*</span>
                  <input {...register("district")} />
                </label>
                <p>{errors.district?.message}</p>

                <label>Block (mandal) <span className="required">*</span>
                  <input {...register("block")} />
                </label>
                <p>{errors.block?.message}</p>

                <label>Village <span className="required">*</span>
                  <input {...register("village")} />
                </label>
                <p>{errors.village?.message}</p>

                <label>Pincode <span className="required">*</span>
                  <input {...register("pincode")} />
                </label>
                <p>{errors.pincode?.message}</p>
              </div>
              
            )}

            {currentStep === 2 && (
                <>
              <div className="profes-field">
                <label>Education <span className="required">*</span></label>
                <select {...register("education")}>
                  <option value="">Select</option>
                  <option value="Primary Schooling">Primary Schooling</option>
                  <option value="High School">High School</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Degree">Degree</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post-Graduate">Post-Graduate</option>
                </select>
                <p>{errors.occupation?.message}</p>

                <label>Experience <span className="required">*</span>
                  <input {...register("experience")} placeholder="e.g. 15 Years" />
                </label>
                <p>{errors.experience?.message}</p>
              </div>
              </>
            )}

            {currentStep === 3 && (
                <>
               <div className="current-field">
                 <form className="crop-form" onSubmit={handleSubmit(onSubmit)}>
                   <div className="cropform-grid">
                   <div className="cropform-columnleft">
                   <div className="form-group">
                     <label>Photo <span className="required">*</span></label>
                     <div className="photo-box">
                         {photo  ? (
                         <img src={photo} alt="Uploaded Farmer" className="uploaded-photo" />
                      ) : (
                        <p>Upload Farmer Photo</p>
                      )}
                     </div>
                     <input type="file" accept="image/*" id="photoInput" onChange={handlePhotoChange} style={{ display: "none" }} />
                    </div>
                 
                    <label>Survey Numbers <span className="required">*</span>
                      <input {...register("surveyNumber")} />
                    </label>
                    <p>{errors.surveyNumber?.message}</p>

                    <label>Total Land Holding (In Acres Nos) <span className="required">*</span>
                      <input {...register("totalLandHolding")} />
                    </label>
                    <p>{errors.totalLandHolding?.message}</p>

                    <label>Geo-tag <span className="required">*</span>
                     <input {...register("geoTag")} />
                    </label>
                    <p>{errors.geoTag?.message}</p>

                    <label>Select Crop <span className="required">*</span>
                    <select {...register("selectCrop")}>
                      <option value="">Select</option>
                      <option value="Grains">Grains</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Cotton">Cotton</option>
                    </select>
                    </label>
                    <p>{errors.selectCrop?.message}</p>

                    <label>Net Income (As per Current Crop/Yr) <span className="required">*</span>
                     <input {...register("netIncome")} />
                    </label>
                    <p>{errors.netIncome?.message}</p>

                    <label>Soil Test <span className="required">*</span>
                    <select {...register("soilTest")}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    </label>
                    <p>{errors.soilTest?.message}</p>

                    <label>Soil Test Certificate <span className="required">*</span>
                     <input {...register("soilTestCertificate")} />
                    </label>
                    <p>{errors.soilTestCertificate?.message}</p>
                    </div>
                    </div>
                    </form>
              </div>
              </>
            )}

            {currentStep === 4 && (
              <div className="proposed-field">
                <label>Survey Numbers <span className="required">*</span>
                  <input {...register("surveyNumber")} />
                </label>
                <p>{errors.surveyNumber?.message}</p>

                <label>Geo-tag <span className="required">*</span>
                  <input {...register("geoTag")} placeholder="Latitude, Longitude" />
                </label>
                <p>{errors.geoTag?.message}</p>

                <label>Select Crop <span className="required">*</span>
                <select {...register("cropType")}>
                  <option value="">Select</option>
                  <option value="Grains">Grains</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Cotton">Cotton</option>
                </select>
                </label>
                <p>{errors.cropType?.message}</p>

                <label>Soil Test <span className="required">*</span>
                <select {...register("soilTest")}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                </label>
                <p>{errors.soilTest?.message}</p>

                <label>Total Land Holding (In Acres) <span className="required">*</span>
                <input type="text" {...register("totalLandHolding")} />
                </label>
                <p>{errors.totalLandHolding?.message}</p>

                <label>Net Income (Per Crop/Yr) <span className="required">*</span>
                <input type="text" {...register("netIncome")} />
                </label>
                <p className="error">{errors.netIncome?.message}</p>

                <label>Soil Test Certificate <span className="required">*</span>
                 <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <p className="error">{errors.soilTestCertificate?.message}</p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="irrigation-field">
                <div className="Current Crop Addition">
                 <label>Water Source <span className="irrigationrequired">*</span>
                 <select {...register("waterSource")}>
                  <option value="">Select</option>
                  <option value="Borewell">Borewell</option>
                  <option value="Open Well">Open Well</option>
                  <option value="Canal">Canal</option>
                  <option value="Tank">Tank</option>
                  <option value="River">River</option>
                  <option value="Drip">Drip</option>
                </select>
                </label>
                <p>{errors.irrigationType?.message}</p>
                <p> Borewell wise Discharge in LPH
                    Discharge during summer months
                    Borewell Location
                </p>
                </div>
               <div className="Proposed Crop Addition">
                  <label>Water Source <span className="required">*</span>
                  <select {...register("waterSource")}>
                    <option value="">Select</option>
                    <option value="Borewell">Borewell</option>
                    <option value="Open Well">Open Well</option>
                    <option value="Canal">Canal</option>
                    <option value="Tank">Tank</option>
                    <option value="River">River</option>
                    <option value="Drip">Drip</option>
                   </select>
                   </label>
                   <p>{errors.waterSource?.message}</p>
                   <p> Borewell wise Discharge in LPH
                       Discharge during summer months
                       Borewell location
                    </p>
              </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="other-field">
                <h3>Bank Details</h3>
                <label>Bank Name <span className="required">*</span>
                   <input type="text" {...register("bankName")} />
                </label>
                <p className="error">{errors.bankName?.message}</p>

                <label>Account Number <span className="required">*</span></label>
                    <input type="text" {...register("accountNumber")} />
                <p className="error">{errors.accountNumber?.message}</p>

                <label>Branch Name <span className="required">*</span></label>
                  <input type="text" {...register("branchName")} />
                <p className="error">{errors.branchName?.message}</p>

                <label>IFSC Code <span className="required">*</span></label>
                 <input type="text" {...register("ifscCode")} />
                 <p className="error">{errors.ifscCode?.message}</p>
               <label>Passbook <span className="required">*</span></label>
               <input
                 type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            <p className="error">{errors.passbookFile?.message}</p>
              </div>
            )}

            {currentStep === 7 && (
              <div className="other-field">
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
                <p>{errors.additionalInfo?.message}</p>
          
                <label className="doclabel">Passbook</label>
                <div className="photo-box" onClick={() => document.getElementById("photoInput").click()}>
                  {photo ? (
                   <img src={photo} alt="Uploaded" className="preview-img" />
                  ) : (
                    "Click to upload"
                  )}
                </div>
                <input type="file" accept="image/*" id="photoInput" onChange={handlePhotoChange} style={{ display: "none" }} />
                
              </div>
            )}

           {currentStep === 8 && (
              <div className="portal-form-group">
                <label> Role/Designation <span className="required">*</span> </label>
                <select {...register("role")}>
                  <option value="">Select</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
                <p className="error">{errors.role?.message}</p>

                <label> Access <span className="required">*</span> </label>
                <select {...register("access")}>
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p className="error">{errors.access?.message}</p>
              </div>
            )}
             
            <div className="btn-group">
              {currentStep > 0 && <button type="button" onClick={handlePrev}>Previous</button>}
              <button type="submit">{currentStep === steps.length - 1 ? "Submit" : "Next"}</button>
            </div>
            </form>
        </FormProvider>
      </div>
      <div className="form-right">
        <img src={farmImage} alt="Farm Field" className="form-image" />
      </div>
    </div>
  );
};

export default FarmerForm;

