import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import Campaign from "../Campaign/Campaign/Campaign";

function Search() {
  const { search } = useLocation();
  const [values, setValues] = useState([]);
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
      } catch (err) {
        console.log(err);
      }
    }
    getCompaign();
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
    <>
      <div className="profile__container">
        <div className="campaign__card">
          {values?.map((item) => (
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
          ))}
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
}

export default Search;
