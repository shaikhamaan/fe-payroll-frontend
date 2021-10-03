import { combineReducers } from "redux";
import { LOGOUT } from "./actions";
import commonReducer from "./common-reducer";

const appReducer = combineReducers({
  commonReducer: commonReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
