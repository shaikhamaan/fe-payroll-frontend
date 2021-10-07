import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import MainReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, MainReducer);

const middlewares = [thunk];
middlewares.push(logger);

let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))

);
let persistor = persistStore(store);

export { store, persistor };
