import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ResetPasswordSetting = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    email: state.email,
  });
  const [error, setErr] = useState({});
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    };
    const error = Validation(user);
    setErr(error);
    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v4/auth/reset-password-settings",
          user,
          config
        );
        if (response) {
          toast.success("password Updates Successfully");
        }
        setTimeout(() => {
          navigate("/settings");
        }, 3000);
      } catch (error) {
        toast.error(error.response.data.error.message);
      }
    }
  };

  const Validation = (value) => {
    const error = {};
    var regularExpressionPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!value.password) {
      error.password = "password is required!!!";
    } else if (value.password !== confirmPass) {
      error.password = "Password mismatch!!!";
    } else if (!regularExpressionPassword.test(value.password)) {
      error.password =
        "password should contain atleast one number and one special character";
    }
    return error;
  };
  return (
    <div className="Auth-form-container">
      <ToastContainer />
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Reset Password </h3>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <span style={{ color: "red" }}>{error.password}</span>
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordSetting;
