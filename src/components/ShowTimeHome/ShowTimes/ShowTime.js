import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./ShowTime.scss";

export default function ShowTime(props) {
  let { theatre, maCumRap } = props;
  let moment = require("moment");

  const renderShowTime = (movie) => {
    return (
      <ul className="d-flex flex-wrap">
        {movie.lstLichChieuTheoPhim?.map((lichChieu, index) => {
          return (
            <li className="timeshow__item" key={index}>
              <NavLink
                className="timeshow__link"
                to={`/booking/${lichChieu.maLichChieu}`}
              >
                <span className="time__begin">
                  {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderMovie = () => {
    if (theatre.maCumRap === maCumRap) {
      return theatre.movieList?.map((movie, index) => {
        return (
          <li className="film__item" key={index}>
            <a
              className="film__link"
              data-toggle="collapse"
              href={`#${"id" + movie.id + index}`}
              role="button"
              aria-expanded="false"
              aria-controls={movie.id}
            >
              <div className="row">
                <div className="film__img col-2">
                  <img src={movie.imageUrl } alt={movie.imageUrl } />
                </div>
                <div className="film__title col-10">
                  <span className="age--C">2D</span>
                  <span className="film__name">{movie.title}</span>
                  <p className="film__timming">99 phút - 7 - IMDb 6.9</p>
                </div>
              </div>
            </a>
            <div className="collapse" id={"id" + movie.id + index}>
              <div className="collapse__content">{renderShowTime(movie)}</div>
            </div>
          </li>
        );
      });
    }
  };
  return <Fragment>{renderMovie()}</Fragment>;
}
