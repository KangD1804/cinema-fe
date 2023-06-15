import axios from "axios";
import { domain, token, groupID } from "../config/setting";
export class AdminManagement {
  getUserList = () => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID}`,
      method: "GET",
    });
  };
  addUser = (thongTinNguoiDung) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data: thongTinNguoiDung,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  updateUser = (thongTinNguoiDung) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data: thongTinNguoiDung,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  deleteUser = (account) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/XoaNguoiDung?account=${account}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  addMovie = (form_data) => {
    return axios({
      url: `${domain}/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data: form_data,
    });
  };

  uploadMovieImage = (hinhAnh) => {
    return axios({
      url: `${domain}/QuanLyPhim/UploadHinhAnhPhim`,
      method: "POST",
      data: hinhAnh,
    });
  };

  editMovie = (phim) => {
    return axios({
      url: `${domain}/QuanLyPhim/CapNhatPhim`,
      method: "POST",
      data: phim,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  deleteMovie = (movieId) => {
    return axios({
      url: `${domain}/QuanLyPhim/XoaPhim?MaPhim=${movieId}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  createShowtime = (thongTin) => {
    return axios({
      url: `${domain}/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data: thongTin,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  addNews = (tinTuc) => {
    return axios({
      url: "https://5e9829e75eabe7001681bbfb.mockapi.io/news",
      method: "POST",
      data: tinTuc,
    });
  };
  editNews = (id, tinTuc) => {
    return axios({
      url: `https://5e9829e75eabe7001681bbfb.mockapi.io/news/${id}`,
      method: "PUT",
      data: tinTuc,
    });
  };
  deleteNews = (id) => {
    return axios({
      url: `https://5e9829e75eabe7001681bbfb.mockapi.io/news/${id}`,
      method: "DELETE",
    });
  };
}
export const adminManagement = new AdminManagement();
