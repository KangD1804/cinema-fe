import axios from "axios";
import { domain, groupID } from "../config/setting";
export class MovieManagementServices {
  getMovieList = () => {
    return axios({
      url: `${domain}/quanLyPhim/laydanhsachphim?manhom=${groupID}`,
      method: "GET",
    });
  };
  getMovieInfo = (movieId) => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
      method: "GET",
    });
  };
  getTheaterSystems  = () => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinHeThongRap`,
      method: "GET",
    });
  };

  getCinemaBySystem = () => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${groupID}`,
      method: "GET",
    });
  };

  getCinemaInfoBySystem = (theatreSytemId) => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinCumRapTheoHeThong?theatreSytemId=${theatreSytemId}`,
      method: "GET",
    });
  };

  getShowtimesInfo = (maLichChieu) => {
    return axios({
      url: `${domain}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      method: "GET",
    });
  };
  getNews = () => {
    return axios({
      url: "https://5e9829e75eabe7001681bbfb.mockapi.io/news",
      method: "GET",
    });
  };
  getNewsDetail = (maTinTuc) => {
    return axios({
      url: `https://5e9829e75eabe7001681bbfb.mockapi.io/news/${maTinTuc}`,
      method: "GET",
    });
  };
}

export const movieManagement = new MovieManagementServices();


/*
*/
