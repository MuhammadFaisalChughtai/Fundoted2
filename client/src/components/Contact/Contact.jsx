import React, { Fragment, useState, useRef } from "react";
import "./contact.css";
function ContactUs(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const [error, setErr] = useState({});

  const button = useRef(null);
  const input = useRef(null);
  const textArea = useRef(null);
  const inputName = useRef(null);
  const [submit, setSubmit] = useState("Submit");

  const { name, email, subject } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const error = registerValidation(formData);
    setErr(error);
    if (Object.keys(error).length === 0) {
      // dispatch(register(user));
      console.log(formData);
    }
  };
  const registerValidation = (value) => {
    const error = {};
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.name) {
      error.name = "name is required!!!";
    }
    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }
    if (!value.subject) {
      error.subject = "Subject is required!!!";
    }
    return error;
  };
  return (
    <Fragment>
      <div className="contactUs__Container">
        <div className="home__blockHeading buisness__BarColor">
          <h1>Contact Us</h1>
        </div>
        <div className="contactusbottom__container">
          <label>First Name</label>
          <p style={{ color: "red" }}>{error.name}</p>
          <input
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Your name.."
          />

          <label>Email</label>
          <p style={{ color: "red" }}>{error.email}</p>

          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Your your email"
          />

          <label for="subject">Subject</label>
          <p style={{ color: "red" }}>{error.subject}</p>

          <textarea
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => onChange(e)}
            placeholder="Write something.."
            style={{ height: "200px" }}
          ></textarea>

          <button
            ref={button}
            className="submit-button"
            type="submit"
            onClick={() => onSubmit()}
          >
            {submit}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactUs;
