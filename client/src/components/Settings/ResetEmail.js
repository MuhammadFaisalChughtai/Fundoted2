import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ResetEmail = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setErr] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = Validation(user);
    setErr(error);
    const config = {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      },
    };
    if (Object.keys(error).length === 0) {
      try {
        await axios.post(
          "http://localhost:5000/api/v4/auth/reset-email",
          user,
          config
        );
        toast.success("Email Changed Successfully");
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
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }

    return error;
  };
  return (
    <div className="Auth-form-container">
      <ToastContainer />
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Change Email </h3>

          <div className="form-group mt-3">
            <label>Enter New Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <span style={{ color: "red" }}>{error.email}</span>
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

export default ResetEmail;
