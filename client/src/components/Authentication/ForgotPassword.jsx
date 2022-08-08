import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { forgetPass, reset } from "../../reducers/authSlice";
const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setErr] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const error = Validation(user);
      setErr(error);
      if (Object.keys(error).length === 0) {
        dispatch(forgetPass(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { message, isError, isSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError && !isSuccess) {
      toast.error(message);
    }
    if (!isError && isSuccess) {
      navigate("/reset-password", { state: user });
      dispatch(reset());
    }
  }, [message, isError, navigate, isSuccess, dispatch]);
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
          <h3 className="Auth-form-title">Forget Password </h3>
          <div className="text-center">
            Already registered?{" "}
            <Link className="link-primary" to="/login">
              Log in
            </Link>
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
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

export default ForgotPassword;
