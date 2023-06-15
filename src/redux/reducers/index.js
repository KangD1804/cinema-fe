import { combineReducers } from "redux";
import UserManagementReducer from "./UserManagementReducer";
import MovieManagementReducer from "./MovieManagementReducer";
const rootReducer = combineReducers({
  UserManagementReducer,
  MovieManagementReducer,
});

export default rootReducer;
