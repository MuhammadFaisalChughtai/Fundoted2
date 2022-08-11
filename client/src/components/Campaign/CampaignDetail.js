import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import useStyle from "../Discover/discover";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  oneComp,
  deleteComp,
  reset,
  deleteCompAdmin,
} from "../../reducers/campaignSlice";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookButton,
  TwitterButton,
  LinkedInButton,
  RedditButton,
  PinterestButton,
} from "react-social";
import { TextField, Typography } from "@material-ui/core";
import StripeBtn from "../Stripe/stripeBtn";
import { SpinnerCircular } from "spinners-react";
import Campaign from "./Campaign/Campaign";

function CampaignDetail() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(10);
  let { title } = useParams();
  const user = JSON.parse(localStorage?.getItem("user")).data;
  title = title?.split("-")?.join(" ");
  useEffect(() => {
    const data = {
      title,
    };
    dispatch(oneComp(data));
  }, [dispatch, title]);
  const deleteNow = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteComp(id));
      try {
      } catch (err) {
        console.log(err);
      }
    }
  };
  const deleteNowAdmin = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteCompAdmin(id));
      try {
      } catch (err) {
        console.log(err);
      }
    }
  };
  const { compaign, message, isSuccess, isError, isLoading } = useSelector(
    (state) => state.compaign
  );
  useEffect(() => {
    if (message !== "" && isSuccess && !isError) {
      toast.success(message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isError, isSuccess, message, navigate]);
  function getDifferenceInDays(date1, date2) {
    const date11 = new Date(date1);
    const date22 = new Date(date2);
    const diffInMs = Math.abs(date22 - date11);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  const fund = compaign && compaign.pledged / 100;
  return (
    <div className="compaign__container">
      <ToastContainer />
      {!isLoading && compaign ? (
        <div>
          <h1>{compaign?.title}</h1>

          <div class="__postedBy">
            <h5 class="__postedByHeadinh5">
              By <b>{compaign?.user?.fname} </b> |{" "}
              <b style={{ fontSize: "15px" }}>Published date: </b>{" "}
              <Moment format="DD/MM/YYYY">{compaign?.date}</Moment> |{" "}
              <b style={{ fontSize: "15px" }}>Expiration date: </b>
              <Moment format="DD/MM/YYYY">{compaign?.expDate}</Moment>
            </h5>
          </div>
          <div className="Social-icons">
            <div className="Social-position">
              <FacebookButton
                className="btn1 pad fab fa-facebook"
                url={`http://localhost:5000/view-compaign/${title}`}
                // app={"986502405192185"}
              ></FacebookButton>
              <TwitterButton
                className="btn1 pad fab fa-twitter"
                url={`http://localhost:5000/view-compaign/${title}`}
              ></TwitterButton>
              <LinkedInButton
                className="btn1 pad fab fa-linkedin"
                url={`http://localhost:5000/view-compaign/${title}`}
              ></LinkedInButton>
              <RedditButton
                className="btn1 pad fab fa-reddit"
                url={`http://localhost:5000/view-compaign/${title}`}
              ></RedditButton>
              <PinterestButton
                className="btn1 pad fab fa-pinterest"
                url={`http://localhost:5000/view-compaign/${title}`}
              ></PinterestButton>
            </div>
          </div>
          <div className="compaign__middle">
            <img src={compaign.image} alt="" />
            <div>
              <div className="mobile__table">
                <table className="view__table">
                  <tbody>
                    <tr className="view__table__color">
                      <th> Catogary</th>
                      <td> {compaign?.catogary}</td>
                    </tr>
                    <tr>
                      <th> Goal</th>
                      <td> {compaign?.goal} $</td>
                    </tr>
                    <tr>
                      <th> pledged</th>
                      <td> {compaign?.pledged / 100} $</td>
                    </tr>
                    <tr>
                      <th> Days</th>
                      <td>
                        {getDifferenceInDays(
                          compaign?.date.split("T")[0],
                          compaign?.expDate.split("T")[0]
                        ) > 1 ? (
                          <span>
                            {getDifferenceInDays(
                              compaign?.date.split("T")[0],
                              compaign?.expDate.split("T")[0]
                            )}{" "}
                            left
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {getDifferenceInDays(
                              compaign?.date.split("T")[0],
                              compaign?.expDate.split("T")[0]
                            )}{" "}
                            left
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th> No Of Backers</th>
                      <td> {compaign?.noOfBackers}</td>
                    </tr>
                    <tr>
                      <th> Expected Donation</th>
                      <td> {compaign?.expectedDonation}</td>
                    </tr>
                    <tr>
                      <th> Maximum Donation</th>
                      <td> {compaign?.maximumDonation}</td>
                    </tr>
                    <tr>
                      <th> Country</th>
                      <td> {compaign?.country}</td>
                    </tr>
                    <tr>
                      <th> City</th>
                      <td> {compaign?.city}</td>
                    </tr>
                    {/* <tr>
                      <th> Funding</th>
                      <td> {compaign?.funding / 100} $</td>
                    </tr> */}
                  </tbody>
                </table>
                {user.role === "user" &&
                  compaign?.goal === compaign?.pledged / 100 && (
                    <div className="compaign__button">
                      <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => deleteNow(compaign._id)}
                      >
                        Claim
                      </Button>
                    </div>
                  )}
                {user.role === "user" ? (
                  <>
                    {compaign?.user?._id === user?.id && (
                      <div className="compaign__button">
                        <Button
                          className={classes.buttonSubmit}
                          variant="contained"
                          color="primary"
                          size="large"
                          type="submit"
                          onClick={() => {
                            navigate("/update-compaign", { state: compaign });
                            dispatch(reset());
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          className={classes.buttonSubmit}
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => deleteNow(compaign._id)}
                        >
                          Delate
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="compaign__button">
                      <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        onClick={() => {
                          navigate("/update-compaign", { state: compaign });
                          dispatch(reset());
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteNowAdmin(compaign._id)}
                      >
                        Delate
                      </Button>
                    </div>
                  </>
                )}
                {user?.title === "invester" && (
                  <div className="stripe___com">
                    <input
                      name="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <StripeBtn
                      amount={amount}
                      pid={compaign.id || compaign._id}
                      catogary={compaign.catogary}
                      title={compaign.title}
                      author={compaign.author}
                      discription={compaign.discription}
                      image={compaign.image}
                      goal={compaign.goal}
                      days={compaign.days}
                      pledged={compaign.pledged}
                      noOfBackers={compaign.noOfBackers}
                      expDate={compaign.expDate}
                      expectedDonation={compaign.expectedDonation}
                      maximumDonation={compaign.maximumDonation}
                      city={compaign.city}
                      country={compaign.country}
                      funding={compaign.funding}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="compaign__downDetail">
            <div className="compaing__description">
              <h2>Description</h2>
              <p>{compaign?.discription}</p>
            </div>
          </div>
        </div>
      ) : (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100vh",
          }}
        >
          <SpinnerCircular />
          {/* <span
            style={{
              margin: "auto 0",
              color: "#313131b8",
              fontSize: "25px",
            }}
          >
            {" "}
            Loading...
          </span> */}
        </h2>
      )}
    </div>
  );
}

export default CampaignDetail;
