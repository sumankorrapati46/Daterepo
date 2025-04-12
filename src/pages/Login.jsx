import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../styles/Login.css"; // Add your styles
import background from "../assets/background-image.png"; 
import logo from "../assets/rightlogo.png"; 
import illustration from "../assets/illustration.png"; // Your image

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login= () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://your-api-endpoint.com/login", data);
      alert("Login Successful!");
      console.log(response.data);
      if (response.success) {
        reset();
      }

    } catch (error) {
      alert("Login Failed!");
      console.error(error);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <img src={logo} alt="Logo" className="logo" />  {/* Top-Right Logo */}

      <div className="login-content">
        {/* Left Side - Login Form */}
        <div className="login-form">
          <h2>Login to your account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group">
                <label>Email/Phone/ID *</label>
                <input type="text" {...register("email")} />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" {...register("password")} />
                <p className="error">{errors.password?.message}</p>
              </div>
            </div>

            <button type="submit" className="login-btn">Login</button>
            <div className="form-links">
              <a href="/forgot-password">Forgot your password?</a>
              <a href="/forgot-username">Forgot your ID?</a>
            </div>
          </form>
        </div>
        </div>
        

        {/* Right Side - Illustration */}
        <div className="login-image">
          <img src={illustration} alt="Login Illustration" />
        </div>
     </div>
  );
};

export default Login;
