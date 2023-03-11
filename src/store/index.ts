import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./modules/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
