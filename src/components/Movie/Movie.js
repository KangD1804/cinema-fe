  import React, { useState, useEffect } from "react";
  import "../Movie/Movie.scss";
  import { movieManagement } from "../../services/MovieManagementServices";
  import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
  import MovieItem from "../MovieItem/MovieItem";
  import {useHistory} from "react-router-dom";

  export default function AllMovie() {
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [movieListSearchResult, setMovieListSearchResult] = useState([]);


    useEffect(() => {
      movieManagement
        .getMovieList()
        .then((result) => {
          setMovieList(result.data.dataList);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.dataList);
        });
    }, []);


    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    useEffect(() => {
      const results = movieList.filter((movie) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setMovieListSearchResult(results);
    }, [searchTerm, movieList]);

    const renderMovieList = () => {
      return movieListSearchResult.map((movie, index) => {
        return <MovieItem movieItem ={movie} key={index}/>;
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
          <div className="row movielist-content">{renderMovieList()}</div>
        </div>
      );
    }
  }
