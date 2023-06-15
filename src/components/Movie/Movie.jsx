import React, { useState, useEffect } from "react";
import "../Movie/Movie.scss";
import { movieManagement } from "../../services/MovieManagementServices";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import MovieItem from "../MovieItem/MovieItem";

export default function AllMovie() {
  let [movieList, setMovieList] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    movieManagement
      .getMovieList()
      .then((result) => {
        setMovieList(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieListSearchResult, setMovieListSearchResult] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = movieList.filter((movie) => {
      return movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setMovieListSearchResult(results);
  }, [searchTerm, movieList]);

  const renderDanhSachPhim = () => {
    return movieListSearchResult.map((movie, index) => {
      return <MovieItem phimItem={movie} key={index} />;
    });
  };
  if (loading) {
    return <SpinnerLoading />;
  } else {
    return (
      <div className="container all-movie">
        <div className="search">
          <div id="wrap">
            <form autoComplete="on">
              <input
                id="search"
                name="search"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Nhập tên phim cần tìm"
              />
              <input
                id="search_submit"
                defaultValue="Rechercher"
                type="submit"
              />
            </form>
          </div>
        </div>
        <div className="row movielist-content">{renderDanhSachPhim()}</div>
      </div>
    );
  }
}
