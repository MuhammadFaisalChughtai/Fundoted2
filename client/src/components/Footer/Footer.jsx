import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = (props) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              The main aim of our platform is to provide leading jobs to the
              deserving individuals in the Government sector. The people, who
              are searching for jobs but could not find one just because of the
              unavailability of any suitable platform. As we mentioned earlier,
              people can’t find their required jobs due to unavailability of any
              platform so, that’s why we are here to provide them jobs on time
              in an efficient and effective way.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li>
                {/* <Link to="/"></Link> */}
                <a href="/">FUNDOTED</a>
              </li>
              <li>
                {/* <Link to="/"></Link> */}
                <a href="/discover">Discover</a>
              </li>
              <li>
                {/* <Link to="/"></Link> */}
                <a href="/settings">Settings</a>
              </li>
              <li>
                {/* <Link to="/"></Link> */}
                <a href="/dashboard">Dashboard</a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>

              {/* <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/termsandconditions">Terms And Conditions</Link>
              </li> */}
              {/* <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li> */}
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="footer__container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2022 All Rights Reserved by Fundoted
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  className="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/"
                >
                  <i class="fab fa-twitter"></i>{" "}
                </a>
              </li>

              <li>
                <a
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  rootClassName: "",
  rootClassName1: "",
};

Footer.propTypes = {
  rootClassName: PropTypes.string,
  rootClassName1: PropTypes.string,
};

export default Footer;
