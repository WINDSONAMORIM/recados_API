import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { apiGet, apiPost } from "../../../services/ApiService";
import { ResponseAPI } from "../../../services/types";
import { User } from "../typeStore";

// opcional - quando o identificador do dado for de nome id
const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.id,
});

export const { selectAll: buscarUsuarios, selectById: buscarUsuarioPorEmail } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (dados: Omit<User, "id">) => {
    const resposta = await apiPost("/users", dados);

    return resposta;
  }
);

export const getUserAll = createAsyncThunk("users/getUserAll", async () => {
  const resposta = await apiGet("/users");

  return resposta;
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    success: false,
  }),
  reducers: {
    adicionarNovoUsuario: usersAdapter.addOne,
    atualizarUsuario: usersAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          usersAdapter.addOne(state, action.payload.data);
        }
        state.success = action.payload.success;
      }
    );
    builder.addCase(
      getUserAll.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          usersAdapter.addMany(state, action.payload.data);
        }
      }
    );
  },
});

export const { adicionarNovoUsuario, atualizarUsuario } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
