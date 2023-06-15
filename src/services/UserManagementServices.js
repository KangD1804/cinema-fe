import axios from "axios";
import { domain, token } from "../config/setting";
export class UserManagement {
  login = ({ username, password }) => {
    return axios({
      url: 'http://localhost:8080/api/sf/account/login',
      method: "POST",
      data: { username, password },
    });
  };
  signup = (newUser) => {
    return axios({
      url:'http://localhost:8080/api/sf/account/signup' ,
      method: "POST",
      data: newUser,
    });
  };
  getUserInfo = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThongTinaccount`,
      method: "POST",
      data: account,
    });
  };
  bookingTicket = (bookingTicketInfo) => {
    return axios({
      url: `${domain}/quanlydatve/datve`,
      method: "POST",
      data: bookingTicketInfo,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  getComment = () => {
    return axios({
      url: "https://5e9829e75eabe7001681bbfb.mockapi.io/comment",
      method: "GET",
    });
  };

  addComment = (comment) => {
    return axios({
      url: "https://5e9829e75eabe7001681bbfb.mockapi.io/comment",
      method: "POST",
      data: comment,
    });
  };
  accountInfo = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThongTinaccount`,
      method: "POST",
      data: account,
    });
  };
}
export const userManagement = new UserManagement();
