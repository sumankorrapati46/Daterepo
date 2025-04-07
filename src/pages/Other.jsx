import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Other.css";
import fieldImage from "../assets/farmImage.png";


const validationSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, "Account Number must be 9-18 digits")
    .required("Account Number is required"),
  branchName: Yup.string().required("Branch Name is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC Code")
    .required("IFSC Code is required"),
  passbookFile: Yup.mixed().required("Passbook file is required"),
});

const Other = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.example.com/bank-details", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("bankName", data.bankName);
        setValue("accountNumber", data.accountNumber);
        setValue("branchName", data.branchName);
        setValue("ifscCode", data.ifscCode);
      })
      .catch((error) => console.error("Error fetching bank details:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("bankName", data.bankName);
      formData.append("accountNumber", data.accountNumber);
      formData.append("branchName", data.branchName);
      formData.append("ifscCode", data.ifscCode);
      formData.append("passbookFile", selectedFile);

      await axios.post("https://api.example.com/bank-details/update", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Bank details updated successfully!");
    } catch (error) {
      console.error("Error updating bank details:", error);
      alert("Failed to update information.");
    }
  };

  return (
    <div className="other-container">

      <div className="othermain-frame">
        <form className="other-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Other Information</h2>
          <h3>Bank Details</h3>

          <div className="form-group">
            <label>Bank Name <span className="required">*</span></label>
            <input type="text" {...register("bankName")} />
            <p className="error">{errors.bankName?.message}</p>
          </div>

          <div className="form-group">
            <label>Account Number <span className="required">*</span></label>
            <input type="text" {...register("accountNumber")} />
            <p className="error">{errors.accountNumber?.message}</p>
          </div>

       
          <div className="form-group">
            <label>Branch Name <span className="required">*</span></label>
            <input type="text" {...register("branchName")} />
            <p className="error">{errors.branchName?.message}</p>
          </div>

          
          <div className="form-group">
            <label>IFSC Code <span className="required">*</span></label>
            <input type="text" {...register("ifscCode")} />
            <p className="error">{errors.ifscCode?.message}</p>
          </div>

          <div className="form-group">
            <label>Passbook <span className="required">*</span></label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <p className="error">{errors.passbookFile?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="image-section">
          <img src={fieldImage} alt="Field Image" className="field-image" />
        </div>
      </div>
    </div>
  );
};

export default Other;
