import React, { useState, Fragment, useMemo } from "react";
import { movieManagement } from "../services/MovieManagementServices";
import MovieInfo from "../components/DetailMovie/MovieInfo/MovieInfo";
import ShowTime from "../components/DetailMovie/ShowTime/ShowTime";
import SpinnerLoading from "../components/SpinnerLoading/SpinnerLoading";

const DetailMovie = (props) => {
  let [movie, setMovie] = useState([]);
  const [loading, $loading] = useState(true);
  const movieId = props.match.params.maphim;

  useMemo(
    () =>
      movieManagement.getMovieInfo(movieId).then((result) => {
        setTimeout(() => {
          setMovie(result.data.dataList);
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
          <MovieInfo movieItem={movie} />
          {/*<ShowTime movie={movie} movieId={movieId} />*/}
        </>
      )}
    </Fragment>
  );
};

export default DetailMovie;
