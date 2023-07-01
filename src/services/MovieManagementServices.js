import axios from "axios";
import { domain, groupID } from "../config/setting";

export class MovieManagementServices {
  getMovieList = () => {
    return axios({
      url: 'http://localhost:8080/api/movies',
      method: "GET",
    });
  };

  getMovieListWithPagination = (page, size) => {
    return axios.get(`http://localhost:8080/api/movies?page=${page}&size=${size}`);
  };

  searchMoviesByNameWithPagination = (name, page, size) => {
    return axios.get(`http://localhost:8080/api/movies/search?name=${name}&page=${page}&size=${size}`);
  };

  getMovieInfo = (movieId) => {
    return axios({
      url:`http://localhost:8080/api/movies/${movieId}`,
      method: "GET",
    });
  };
  getTheaterSystems  = () => {
    return axios({
      url: `http://localhost:8080/api/theaters`,
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
