import { LOGIN } from "../types/UserManagementTypes";
import { LOGOUT } from "../types/UserManagementTypes";
import { COMMENT } from "../types/UserManagementTypes";

let account = "";
if (localStorage.getItem("userLogin")) {
  account = JSON.parse(localStorage.getItem("userLogin")).account;
}
const initialState = {
  account: account,
  comment: "",
  rating: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      state.account = action.account;
      return { ...state };
    }
    case LOGOUT: {
      localStorage.removeItem("userLogin");
      state.account = "";
      window.location.reload();
      return { ...state };
    }
    case COMMENT: {
      return { ...state };
    }
    default:
  }
  return { ...state };
};
