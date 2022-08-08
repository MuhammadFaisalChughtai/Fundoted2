import axios from "axios";
const url = "http://localhost:5000";

export const getBooks = () => axios.get(url);
export const createCampaign = (post) => axios.post(`${url}/campaign/add`, post);
export const updateBook = (id, post) => axios.put(`${url}/${id}`, post);
export const deleteBook = (id) => axios.delete(`${url}/${id}`);
export const likeCampaign = (id, post) =>
  axios.patch(`${url}/${id}/likeBook`, post);

export const register = (user) =>
  axios.post(`${url}/api/v4/auth/register`, user);
export const login = (user) => axios.post(`${url}/user/signin`, user);
