import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Setting() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (window.confirm) {
        const config = {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
          },
        };
        const response = await axios.delete(
          "http://localhost:5000/api/v4/auth/deleteUser",
          config
        );
        toast.success(response.data.msg);
        if (response) {
          localStorage.removeItem("user");
        }
        setTimeout(() => {
          navigate("/");
        }, []);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="settings__container">
      <ToastContainer />

      <h1>
        <i className="fa-solid fa-gear"></i> Settings
      </h1>
      <div
        style={{ backgroundColor: "#F7F9FA", width: "100%", padding: "10px" }}
      >
        <Link to="/change-email">
          <div className="setting__com">
            <i className="fa-solid fa-envelope"></i>
            <div className="setting__chnagePassword">
              <h2>Change Email</h2>
              <p>Click here to change your Email</p>
            </div>
          </div>
        </Link>
        <Link to="/forget-password-settings">
          <div className="setting__com">
            <i className="fa-solid fa-lock"></i>{" "}
            <div className="setting__chnagePassword">
              <h2>Change Password</h2>
              <p>Click here to change your password</p>
            </div>
          </div>
        </Link>

        <div className="settings__button">
          <button onClick={() => handleSubmit()}>
            <i className="fa-solid fa-trash"></i> Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
