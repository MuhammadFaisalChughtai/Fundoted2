import React, { useEffect, useState } from "react";
import { reset, myComp } from "../../reducers/campaignSlice";
import Campaign from "../Campaign/Campaign/Campaign";
import { SpinnerCircular } from "spinners-react";
import { Link } from "react-router-dom";
// import { allComp } from "../../reducers/campaignSlice";
// import { allComp } from "../../reducers/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage?.getItem("user")).data;

  useEffect(() => {
    dispatch(myComp(user.id));
  }, [dispatch, user.id]);
  const { compaign, isLoading, isSuccess } = useSelector(
    (state) => state.compaign
  );
  return (
    <div className="profile__container">
      {/* <div className="profile__card">
        <div className="profile__img">
          <img
            src="https://redpaladin.com/wp-content/uploads/2021/06/dummy-avatar.png"
            alt=""
          />
        </div>
      </div> */}
      <div className="campaign__card">
        {!isLoading &&
        isSuccess &&
        compaign !== undefined &&
        compaign.length > 0 ? (
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
      </div>
    </div>
  );
};

export default Dashboard;
