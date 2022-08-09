import { React, useState, useEffect } from "react";
import "./style.js";

import { Router, BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Discover from "./components/Discover/Discover.jsx";
import LoginRegister from "./components/Authentication/LoginRegister";
import Footer from "./components/Footer/Footer.jsx";
import Campaign from "./components/Campaign/Campaign/Campaign";
import ForgetPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import PrivateRoute from "./components/PrivateRoute.js";
import { useDispatch } from "react-redux";
import { loadUsr } from "./reducers/authSlice";
import CampaignDetail from "./components/Campaign/CampaignDetail.js";
import UpdateCompaign from "./components/Campaign/Campaign/UpdateCompaign.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import AdminLoginRegister from "./components/Admin/AdminLoginRegister.jsx";
import Search from "./components/Home/Search";
import Payment from "./components/Stripe/Payment";
import Setting from "./components/Setting.js";
import ForgetPasswordSetting from "./components/Settings/ForgetPasswordSetting";
import ResetPasswordSetting from "./components/Settings/ResetPasswordSetting.js";
import ChangeEmail from "./components/Settings/ChangeEmail";
import ResetEmail from "./components/Settings/ResetEmail.js";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.user) {
      dispatch(loadUsr());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <PrivateRoute>
              <Discover />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/view-compaign/:title"
          element={<CampaignDetail />}
        />
        <Route
          exact
          path="/forget-password-settings"
          element={<ForgetPasswordSetting />}
        />
        <Route
          exact
          path="/reset-password-settings"
          element={<ResetPasswordSetting />}
        />
        <Route exact path="/change-email" element={<ChangeEmail />} />
        <Route exact path="/reset-email" element={<ResetEmail />} />

        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/update-compaign" element={<UpdateCompaign />} />
        <Route exact path="/login" element={<LoginRegister />} />
        <Route exact path="/admin-login" element={<AdminLoginRegister />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/settings" element={<Setting />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
