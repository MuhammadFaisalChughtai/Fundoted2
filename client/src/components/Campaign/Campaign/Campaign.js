import React from "react";
import {
  Card,
  Button,
  Typography,
  TextField,
  ImageList,
} from "@material-ui/core";
import "./style.css";
import innovate from "../../../assets/innovate.jpg";
import Moment from "react-moment";

import { useNavigate } from "react-router-dom";
const Campaign = ({
  catogary,
  title,
  author,
  discription,
  image,
  goal,
  days,
  pledged,
  noOfBackers,
  date,
}) => {
  const navigate = useNavigate();
  const backProject = () => {
    navigate("/login");
  };
  return (
    <section className="container">
      <div className="left">
        <img src={image} alt="" />
      </div>

      <div className="right">
        <div className="top">
          <p>{catogary}</p>
          <p>
            <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>
        </div>

        <h1>{title}</h1>

        <h6>{discription}</h6>
        <div className="stat">
          <div>
            <h5>No Of Backers :{noOfBackers} </h5>
            <h5>Goal : {goal}</h5>
            <h5>Pledged : {pledged}</h5>
          </div>

          <div>
            <button onClick={backProject}>Back Project</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Campaign;
