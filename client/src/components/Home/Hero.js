import React, { useState } from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const Hero = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([10000, 1000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    price: 0,
  });
  const [err, setErr] = useState("");
  const { city, type, price } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("working");
    const errors = validation(formData);
    setErr(errors);
    // if (Object.keys(errors).length === 0) {
    navigate(`/search?@type=${type.split(" ").join("-")}@price=${value}`);
    // }
  };
  const validation = (value) => {
    const error = {};

    if (!value.city) {
      error.city = "City name is required!!!";
    }

    if (!value.type) {
      error.type = "Property Type is required!!!";
    }

    return error;
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <form className="hero__flex" onSubmit={(e) => onSubmit(e)}>
            <div className="search__dropDown">
              <Select
                native
                value={type}
                onChange={(e) => onChange(e)}
                inputProps={{
                  name: "type",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="Campaign Type" value="Campaign Type">
                  Select Campaign Type
                </option>
                <option name="type" value="Family House">
                  Family House
                </option>
                <option name="type" value="House & Villa">
                  House & Villa
                </option>
                <option name="type" value="Apartment">
                  Apartment
                </option>
                <option name="type" value="Office & Studio">
                  Office & Studio
                </option>
                <option name="type" value="Villa & Condo">
                  Villa & Condo
                </option>
              </Select>
            </div>
            <div className="search__dropDown">
              <Select
                native
                value={type}
                onChange={(e) => onChange(e)}
                inputProps={{
                  name: "type",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="Campaign Type" value="Campaign Type">
                  Select Campaign Type
                </option>
                <option name="type" value="Family House">
                  Family House
                </option>
                <option name="type" value="House & Villa">
                  House & Villa
                </option>
                <option name="type" value="Apartment">
                  Apartment
                </option>
                <option name="type" value="Office & Studio">
                  Office & Studio
                </option>
                <option name="type" value="Villa & Condo">
                  Villa & Condo
                </option>
              </Select>
            </div>
            <div className="">
              <div className={classes.root}>
                <span>Campaign Budget</span>

                <Slider
                  value={value}
                  onChange={handleChange}
                  min={10000}
                  step={1000}
                  max={200000}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </div>
            </div>

            <div className="">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={onSubmit}
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
