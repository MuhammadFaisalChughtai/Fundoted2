import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import compaignReducer from "./reducers/campaignSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    compaign: compaignReducer,
  },
});
