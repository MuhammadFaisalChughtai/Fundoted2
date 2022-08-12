import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import Campaign from "../Campaign/Campaign/Campaign";

function Search() {
  const { search } = useLocation();
  const [compaign, setValues] = useState([]);
  const [msg, setMsg] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  //   all-properties
  useEffect(() => {
    async function getCompaign() {
      try {
        let type = capitalize(search?.split("@")[1]?.split("=")[1]);
        let price = search.split("@")[2].split("=")[1];
        console.log(type, price);
        const body = { type, price };
        console.log(body);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/v4/campaign/range-campaign",
          body,
          config
        );
        console.log(results.data);
        setValues(results.data.campaign);
        results.data.campaign.length < 1 && setIsLoading(true);
      } catch (err) {
        console.log(err);
      }
    }
    getCompaign();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setMsg("You have No Campaigns");
    }, 2000);
  }, []);
  function capitalize(str) {
    let results = [];
    str.split("-").forEach((element) => {
      results.push(
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      );
    });
    return results.join(" ");
  }
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
        {!isLoading && compaign !== undefined && compaign.length > 0 ? (
          compaign?.map((item) => (
            <Link
              to={`/view-compaign/${item?.title?.split(" ").join("-")}`}
              key={item._id}
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
          <>
            {msg === "Loading..." ? (
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
                  {msg}
                </span>
              </h2>
            ) : (
              <h2
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "100vh",
                }}
              >
                <span
                  style={{
                    margin: "auto 0",
                    color: "#313131b8",
                    fontSize: "25px",
                  }}
                >
                  {msg}
                </span>
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
