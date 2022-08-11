import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyle from "./discover";
import { useSelector, useDispatch } from "react-redux";
import image from "../../assets/innovate.jpg";
import { uploadPic, createComp } from "../../reducers/campaignSlice";
// import { createCampaign } from "../../actions/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Select from "@material-ui/core/Select";
// import MenuItem from "@mui/material/MenuItem";

const Discover = ({ currentId, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    userId: "",
    catogary: "",
    title: "",
    author: "",
    discription: "",
    goal: "",
    days: "",
    image: "",
    expectedDonation: 0,
    maximumDonation: 0,
    city: "",
    country: "",
    expDate: "",
  });
  const updatedBook = useSelector((state) =>
    currentId ? state.books.find((book) => book._id === currentId) : null
  );

  const clear = () => {
    //setCurrentId(0);
    setCampaign({
      userId: "",
      catogary: "",
      title: "",
      author: "",
      discription: "",
      goal: "",
      days: "",
      image: "",
    });
  };
  const uploadImage = (e) => {
    console.log("file");
    const data = new FormData();
    data.append("img", e.target.files[0]);
    dispatch(uploadPic(data));
  };
  const { imgUrl, isSuccess } = useSelector((state) => state.compaign);

  // create-campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      catogary: campaign.catogary,
      title: campaign.title,
      author: campaign.author,
      discription: campaign.discription,
      goal: campaign.goal,
      days: campaign.days,
      image: imgUrl,
      expectedDonation: campaign.expectedDonation,
      maximumDonation: campaign.maximumDonation,
      city: campaign.city,
      country: campaign.country,
      expDate: campaign.expDate,
    };
    dispatch(createComp(data));
  };
  useEffect(() => {
    if (isSuccess && imgUrl === "") {
      toast.success("Property Added");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isSuccess, imgUrl, navigate]);
  return (
    <div className={classes.container}>
      <ToastContainer />
      <div className={classes.left}>
        <h2 style={{ color: "green", textAlign: "center" }}>
          Bring your creative project to life.
        </h2>
        <img src={image} alt="" className={classes.image} />
        <h5 style={{ color: "green", textAlign: "center" }}>
          We see Fundoted as a home for creative minds and a wonderful platform;
          where people who believe, respect, and see the vision can support an
          idea and make it a reality.
        </h5>
      </div>
      <div className={classes.right}>
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h3" color="primary" className={classes.title}>
              Create Your Campaign
            </Typography>
            {/* <TextField
              name="title"
              variant="outlined"
              label="Catogary"
              fullWidth
              value={campaign.catogary}
              onChange={(e) =>
                setCampaign({ ...campaign, catogary: e.target.value })
              }
            /> */}
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={campaign.catogary}
              label="Age"
              onChange={(e) =>
                setCampaign({ ...campaign, catogary: e.target.value })
              }
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
            <Select
              native
              fullWidth
              value={campaign.catogary}
              className="drop__down"
              style={{
                margin: "10px",
                background: "transparent",
                borderBottom: "none",
              }}
              onChange={(e) =>
                setCampaign({ ...campaign, catogary: e.target.value })
              }
              inputProps={{
                name: "type",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="Campaign Type" value="Campaign Type">
                Select Category
              </option>
              <option name="type" value="Arts">
                Arts
              </option>
              <option name="type" value="Design & Tech">
                Design & Tech
              </option>
              <option name="type" value="Food & Craft">
                Food & Craft
              </option>
              <option name="type" value="Film">
                Film
              </option>
              <option name="type" value="Games">
                Games
              </option>
              <option name="type" value="Music">
                Music
              </option>
              <option name="type" value="Publishing">
                Publishing
              </option>
            </Select>
            <TextField
              name="author"
              variant="outlined"
              label="Title"
              fullWidth
              value={campaign.title}
              onChange={(e) =>
                setCampaign({ ...campaign, title: e.target.value })
              }
            />
            <TextField
              name="discription"
              variant="outlined"
              label="Author"
              fullWidth
              value={campaign.author}
              onChange={(e) =>
                setCampaign({ ...campaign, author: e.target.value })
              }
            />
            <TextField
              name="price"
              variant="outlined"
              type="number"
              label="Goal required in Pkr"
              fullWidth
              value={campaign.goal}
              onChange={(e) =>
                setCampaign({ ...campaign, goal: e.target.value })
              }
            />
            <TextField
              name="price"
              variant="outlined"
              label="No of days "
              fullWidth
              // label="Number"
              type="number"
              value={campaign.days}
              onChange={(e) =>
                setCampaign({ ...campaign, days: e.target.value })
              }
            />
            <TextField
              name="price"
              variant="outlined"
              label="Discription"
              fullWidth
              multiline
              rows={4}
              value={campaign.discription}
              onChange={(e) =>
                setCampaign({ ...campaign, discription: e.target.value })
              }
            />
            {/* <TextField
              name="expectedDonation"
              variant="outlined"
              label="Expected Donation"
              fullWidth
              value={campaign.expectedDonation}
              onChange={(e) =>
                setCampaign({ ...campaign, expectedDonation: e.target.value })
              }
            />
            <TextField
              name="maximumDonation"
              variant="outlined"
              label="Maximum Donation"
              fullWidth
              value={campaign.maximumDonation}
              onChange={(e) =>
                setCampaign({ ...campaign, maximumDonation: e.target.value })
              }
            /> */}
            <TextField
              name="city"
              variant="outlined"
              label="city"
              fullWidth
              value={campaign.city}
              onChange={(e) =>
                setCampaign({ ...campaign, city: e.target.value })
              }
            />
            <TextField
              name="country"
              variant="outlined"
              label="country"
              fullWidth
              value={campaign.country}
              onChange={(e) =>
                setCampaign({ ...campaign, country: e.target.value })
              }
            />
            <TextField
              name="expDate"
              variant="outlined"
              type="date"
              label="expDate"
              fullWidth
              value={campaign.expDate}
              onChange={(e) =>
                setCampaign({ ...campaign, expDate: e.target.value })
              }
            />

            {/* <FileBase64
              // value={campaign.image}
              label="Select an image"
              type="file"
              name="cover"
              //   value={file}
              onChange={(e) => uploadImage(e)}
              placeholder="Add image url"
              // onDone={({ base64 }) =>
              //   setCampaign({ ...campaign, image: base64 })
              // }
            /> */}
            <input
              type="file"
              name="cover"
              //   value={file}
              onChange={(e) => uploadImage(e)}
              placeholder="Add image url"
            />
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
            >
              Clear
            </Button>
          </form>
        </Paper>
      </div>
      s
    </div>
  );
};

export default Discover;
