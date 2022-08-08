import React, { useState, useEffect } from "react";
import "../Authentication/loginRegister.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
// import { signin, signup } from "../../actions/index";
import { useNavigate, Link } from "react-router-dom";
import { register, login, reset } from "../../reducers/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginRegister = () => {
  const [user, setUser] = useState({
    fname: "",
    email: "",
    password: "",
    cPassword: "",
    title: "user",
    role: "admin",
  });

  const [confirmPass, setConfirmPass] = useState("");
  let [authMode, setAuthMode] = useState("signin");
  const [error, setErr] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setErr("");
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authMode === "signin") {
      const error = loginValidation(user);
      setErr(error);
      if (Object.keys(error).length === 0) {
        dispatch(login(user));
      }
    } else {
      const error = registerValidation(user);
      setErr(error);
      if (Object.keys(error).length === 0) {
        dispatch(register(user));
      }
    }
  };
  const { message, isError, isSuccess, isAuth } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!isError && isSuccess && localStorage.user && isAuth) {
      navigate("/");
    }
  }, [message, isError, isSuccess, navigate, isAuth]);
  const registerValidation = (value) => {
    const error = {};
    var regularExpressionPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.fname) {
      error.fname = "name is required!!!";
    }
    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }
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
  const loginValidation = (value) => {
    const error = {};
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }
    if (!value.password) {
      error.password = "password is required!!!";
    }
    return error;
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <ToastContainer />

        <form className="Auth-form">
          <div className="Auth-form-content">
            <h2 className="Auth-form-title">Welcome to Fundoted Admin</h2>
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <span style={{ color: "red" }}>{error.email}</span>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span style={{ color: "red" }}>{error.password}</span>
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
            <p className="text-center mt-2">
              Forgot{" "}
              <Link
                to="/forget-password"
                onClick={() => {
                  dispatch(reset());
                }}
              >
                password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <ToastContainer />

      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up Admin </h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g anees ur rehman"
              value={user.fname}
              onChange={(e) => {
                setUser({ ...user, fname: e.target.value });
              }}
            />
            <span style={{ color: "red" }}>{error.fname}</span>
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
          {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              className="form-group mt-3"
              // style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="radio"
                name="title"
                value={invester}
                onChange={(e) => {
                  setInvestor(true);
                  setOnlyUser(false);

                  // console.log(title);
                }}
              />
                <label>Invester</label>
            </div>
            <div className="form-group mt-3">
              <input
                type="radio"
                name="title"
                value={onlyUser}
                onChange={(e) => {
                  setOnlyUser(true);
                  setInvestor(false);

                  // console.log(title);
                }}
              />{" "}
              <label>User</label>
                
            </div>
          </div> */}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot{" "}
            <Link
              to="/forget-password"
              onClick={() => {
                dispatch(reset());
              }}
            >
              password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginRegister;
