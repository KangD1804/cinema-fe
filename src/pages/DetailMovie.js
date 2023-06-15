import React, { useState, Fragment, useMemo } from "react";
import { movieManagement } from "../services/MovieManagementServices";
import MovieInfo from "../components/DetailMovie/MovieInfo/MovieInfo";
import ShowTime from "../components/DetailMovie/ShowTime/ShowTime";
import SpinnerLoading from "../components/SpinnerLoading/SpinnerLoading";

const DetailMovie = (props) => {
  let [phim, setPhim] = useState([]);
  const [loading, $loading] = useState(true);
  const movieId = props.match.params.maphim;
  useMemo(
    () =>
      movieManagement.getMovieInfo(movieId).then((result) => {
        setTimeout(() => {
          setPhim(result.data);
          $loading(false);
        }, 1500);
      }),
    [movieId]
  );

  return (
    <Fragment>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <MovieInfo phimItem={phim} />
          <ShowTime phim={phim} movieId={movieId} />
        </>
      )}
    </Fragment>
  );
};

export default DetailMovie;
