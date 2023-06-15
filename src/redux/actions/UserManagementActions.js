import { LOGIN } from "../types/UserManagementTypes";
import { LOGOUT } from "../types/UserManagementTypes";
import { COMMENT } from "../types/UserManagementTypes";
export const loginAction = (account) => {
  return { type: LOGIN, account };
};

export const logoutAction = () => {
  return { type: LOGOUT };
};
