import React, { useEffect, useState } from "react";
import { allComp, reset } from "../../reducers/campaignSlice";
import Campaign from "../Campaign/Campaign/Campaign";
import { SpinnerCircular } from "spinners-react";
import { Link, useNavigate } from "react-router-dom";
// import { allComp } from "../../reducers/campaignSlice";
// import { allComp } from "../../reducers/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero";
const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allComp());
  }, [dispatch]);

  const { compaign, isLoading, isSuccess } = useSelector(
    (state) => state.compaign
  );
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess && localStorage.user && isAuth) {
      navigate("/");
    }
  }, [isSuccess, navigate, isAuth]);
  return (
    <>
      <Hero />
      <div className="profile__container">
        <div className="campaign__card">
          {!isLoading && compaign && isSuccess ? (
            compaign?.map((item) => (
              <Link
                to={`/view-compaign/${item?.title?.split(" ").join("-")}`}
                key={item._id}
                onClick={() => dispatch(reset())}
              >
                <Campaign
                  catogary={item.catogary}
                  title={item.title}
                  author={item.author}
                  discription={item.discription}
                  image={item.image}
                  goal={item.goal}
                  days={item.days}
                  pledged={item.pledged}
                  noOfBackers={item.noOfBackers}
                  date={item.date}
                />
              </Link>
            ))
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
              <span
                style={{
                  margin: "auto 0",
                  color: "#313131b8",
                  fontSize: "25px",
                }}
              >
                {" "}
                Loading...
              </span>
            </h2>
          )}
          {/* <div className="profile__card">
            <div className="__sidebar">
              <div style={{ position: "sticky", top: "13%" }}>
                <div className="home__blockHeading tech__trendingColor">
                  <h2>Recommend campaigns</h2>
                </div>

                <div>
                  <div className="home__trendingBlock">
                    <img
                      width="180"
                      height="70"
                      className="home__trendingBlockImage"
                      style={{ height: "73px" }}
                      src="https://bepakistani.pk/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fbepakistani-dbc7b.appspot.com%2Fo%2Fsim-information-with-number--easiest-way-to-check-sim-owner-details.webp%3Falt%3Dmedia%26token%3D61092134-5bd4-4ee6-a9aa-fa06a51603c7&w=1200&q=75"
                      alt=""
                    />
                    <div>
                      <h3
                        style={{ textTransform: "capitalize" }}
                        className="tech__postTitle tech__labelColor"
                      >
                        Fun Unlimited
                      </h3>

                      <h3 className="tech__postTitle">
                        Sim Information With Number - Easiest Way To Check Sim
                        Owner Details
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
