import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
} from "../../../services/ApiService";
import { ResponseAPI } from "../../../services/types";
import { DeleteRecado, GetRecados, PutRecados, Recado } from "../typeStore";

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarRecados, selectById: buscarRecadoPorId } =
  adapter.getSelectors((state: RootState) => state.recados);

export const getRecados = createAsyncThunk(
  "users/getRecados",
  async (params: GetRecados) => {
    const resposta = await apiGet(`/users/${params.id}/recado`, params.query);
    return resposta;
  }
);

export const postRecado = createAsyncThunk(
  "users/postRecado",
  async (dados: any) => {
    const resposta = await apiPost(`/users/${dados.id}/recado`, dados.recado);
    return resposta;
  }
);

export const putModeRecado = createAsyncThunk(
  "users/putModeRecado",
  async (params: PutRecados) => {
    const resposta = await apiPut(
      `/users/${params.id}/recado/${params.idRecado}`,
      params.data
    );
    return resposta;
  }
);

export const deleteRecado = createAsyncThunk(
  "users/deleteRecado",
  async (params: DeleteRecado) => {
    const resposta = await apiDelete(
      `/users/${params.id}/recado/${params.idRecado}`
    );
    return resposta;
  }
);

const recadosSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postRecado.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.addOne(state, action.payload.data);
        }
      }
    );
    builder.addCase(
      getRecados.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.setAll(state, action.payload.data);
        }
      }
    );
    builder.addCase(
      putModeRecado.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.updateOne(state, {
            id: action.payload.data.id,
            changes: action.payload.data,
          });
        }
      }
    );
    builder.addCase(
      deleteRecado.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if (action.payload.success) {
          adapter.removeOne(state, action.payload.data.id);
        }
      }
    );
  },
});

export const recadosReducer = recadosSlice.reducer;
