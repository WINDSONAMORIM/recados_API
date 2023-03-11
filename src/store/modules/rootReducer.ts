import { combineReducers } from "redux";
import { userLoggedReducer } from "./userLogged/userLoggedSlice";
import { usersReducer } from "./users/userSlice";
import { recadosReducer } from "./recados/recadosSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  userLogged: userLoggedReducer,
  recados: recadosReducer,
});

export { rootReducer };
