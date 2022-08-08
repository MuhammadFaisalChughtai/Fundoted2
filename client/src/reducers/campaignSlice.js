import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import campaignService from "./campaignService";

const initialState = {
  compaign: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  imgUrl: "",
};

// Create Compaign
export const createComp = createAsyncThunk(
  "campaign/create-campaign",
  async (user, thunkAPI) => {
    try {
      return await campaignService.createCompaign(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// View all Compaign
export const allComp = createAsyncThunk(
  "campaign/all-campaign",
  async (user, thunkAPI) => {
    try {
      return await campaignService.allCompaign(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// View one Compaign
export const oneComp = createAsyncThunk(
  "campaign/one-campaign",
  async (user, thunkAPI) => {
    try {
      return await campaignService.viewCompaign(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// View one Compaign
export const deleteComp = createAsyncThunk(
  "campaign/delete-campaign",
  async (id, thunkAPI) => {
    try {
      return await campaignService.deleteCompaign(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update Compaign
export const updateComp = createAsyncThunk(
  "campaign/update-campaign",
  async (id, thunkAPI) => {
    try {
      return await campaignService.updateCompaign(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// My Compaigns
export const myComp = createAsyncThunk(
  "campaign/my-campaign",
  async (id, thunkAPI) => {
    try {
      return await campaignService.myCompaign(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// My Compaigns
export const switchUsr = createAsyncThunk(
  "campaign/switch-user",
  async (id, thunkAPI) => {
    try {
      return await campaignService.switchUser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Upload Image
export const uploadPic = createAsyncThunk(
  "campaign/uplaod-image",
  async (image, thunkAPI) => {
    try {
      return await campaignService.uploadImage(image);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// View one Compaign
export const deleteCompAdmin = createAsyncThunk(
  "campaign/delete-campaign-admin",
  async (id, thunkAPI) => {
    try {
      return await campaignService.deleteCompaignAdmin(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// View one Compaign
export const updateCompAdmin = createAsyncThunk(
  "campaign/update-campaign-admin",
  async (data, thunkAPI) => {
    try {
      return await campaignService.updateCompaign(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const compaignSlice = createSlice({
  name: "compaign",
  initialState,
  reducers: {
    reset: (state) => initialState,
    // reset: (state) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        // state.goals.push(action.payload);
      })
      .addCase(createComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(allComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(allComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = action.payload;
      })
      .addCase(allComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(oneComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(oneComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = action.payload;
      })
      .addCase(oneComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = null;
        state.message = action.payload;
      })
      .addCase(deleteComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = null;
        state.message = action.payload;
      })
      .addCase(updateComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(myComp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(myComp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = action.payload;
        state.message = "";
      })
      .addCase(myComp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(switchUsr.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(switchUsr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        // state.compaign = action.payload;
        state.message = "";
      })
      .addCase(switchUsr.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadPic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = action.payload;
      })
      .addCase(uploadPic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCompAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteCompAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = null;
        state.message = action.payload;
      })
      .addCase(deleteCompAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCompAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateCompAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imgUrl = "";
        state.compaign = null;
        state.message = action.payload;
      })
      .addCase(updateCompAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = compaignSlice.actions;
export default compaignSlice.reducer;
