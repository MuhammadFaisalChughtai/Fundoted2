import axios from "axios";

const API_URL = "http://localhost:5000/api/v4/campaign/";

// Create Compaign
const createCompaign = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };
  const response = await axios.post(
    API_URL + "create-campaign",
    userData,
    config
  );
  return response.data;
};
// view Compaign
const allCompaign = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(API_URL + "all-compaign", userData, config);
  return response.data.compaign;
};

const viewCompaign = async (title) => {
  const response = await axios.post(API_URL + "view-compaign", title);
  return response.data.compaign;
};
const deleteCompaign = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const response = await axios.delete(
    API_URL + `delete-compaign/${id}`,
    config
  );
  return response.data.msg;
};
const updateCompaign = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const response = await axios.put(API_URL + "update-post", data, config);
  console.log(response.data);
  return response.data.msg;
};
const myCompaign = async (data) => {
  const config = {
    headers: {
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const response = await axios.post(API_URL + "my-campaign", data, config);
  return response.data.campaign;
};
const switchUser = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const response = await axios.post(API_URL + "switch", id);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data.msg;
};
// Upload Image
const uploadImage = async (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      //   "x-auth-token": JSON.parse(localStorage.getItem("token")),
    },
  };
  const response = await axios.post(API_URL + "upload-photo", data, config);
  return response.data;
};

const deleteCompaignAdmin = async (id) => {
  const response = await axios.delete(API_URL + `delete-campaign-admin/${id}`);
  return response.data.msg;
};

const updateCompaignAdmin = async (body) => {
  const response = await axios.put(API_URL + "update-camp-admin", body);
  return response.data.msg;
};
const campaignService = {
  createCompaign,
  uploadImage,
  allCompaign,
  viewCompaign,
  deleteCompaign,
  updateCompaign,
  myCompaign,
  switchUser,
  deleteCompaignAdmin,
  updateCompaignAdmin,
};

export default campaignService;
