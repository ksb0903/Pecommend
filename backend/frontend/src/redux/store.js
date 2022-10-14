import { combineReducers } from "redux";
import userStore from "./user_reducer";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["userStore"],
};

export const store = combineReducers({
  userStore,
});

export default persistReducer(persistConfig, store);
