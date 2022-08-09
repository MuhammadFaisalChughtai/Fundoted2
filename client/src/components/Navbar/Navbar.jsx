import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import search from "../../assets/search.png";
import panel from "../../assets/panel.png";
import { logout } from "../../reducers/authSlice";
import { reset, switchUsr, allComp } from "../../reducers/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "@mui/material";
const Navbar = () => {
  // localStorage.clear();
  let user = localStorage?.user
    ? JSON.parse(localStorage.getItem("user")).data
    : "";
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, switchUser } = useSelector(
    (state) => state.compaign
  );
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  useEffect(() => {}, [isAuth, user, isLoading, isSuccess, switchUser]);
  const switchUser1 = () => {
    const data = {
      id: user.id,
    };
    dispatch(switchUsr(data));
    // dispatch(allComp());
  };
  return (
    <>
      <nav className="navbar">
        <ToastContainer />

        <div className="nav-container">
          {user?.role === "admin" ? (
            <NavLink
              to="/"
              className="nav-logo"
              onClick={() => {
                dispatch(allComp());
              }}
            >
              FUNDOTED ADMIN
              <i className="fas fa-code"></i>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/"
                className="nav-logo"
                onClick={() => {
                  dispatch(allComp());
                }}
              >
                FUNDOTED
                <i className="fas fa-code"></i>
              </NavLink>
            </>
          )}

          <ul className="nav-menu active">
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={() => {
                  dispatch(allComp());
                }}
                className="nav-links"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/discover"
                onClick={() => dispatch(reset())}
                className="nav-links"
              >
                Discover
              </NavLink>
            </li>
            {/* {user?.role === "user" ? (
              <>
                {" "}
                {user?.title === "user" && (
                  
                )}
                <li className="nav-item">
                  <button
                    style={{ textTransform: "capitalize" }}
                    // to="/discover"
                    onClick={() => switchUser1()}
                    className=""
                  >
                    {user?.title}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/discover"
                    onClick={() => dispatch(reset())}
                    className="nav-links"
                  >
                    Discover
                  </NavLink>
                </li>
              </>
            )} */}
            <li className="nav-item">
              <NavLink to="/blog" className="nav-links">
                Contact
              </NavLink>
            </li>

            {isAuth ? (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-links">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(reset());
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-links">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
