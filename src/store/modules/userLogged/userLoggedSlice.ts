import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../../services/ApiService";
import { InitialStateUserLogged } from "../typeStore";

const initialState: InitialStateUserLogged = {
  success: false,
  message: "",
  data: null,
};

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (idUser: string) => {
    const resposta = await apiGet(`/users/${idUser}`);

    return resposta;
  }
);

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
  },
});

export const userLoggedReducer = userLoggedSlice.reducer;
