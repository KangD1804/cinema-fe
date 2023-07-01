import React from "react";
import { NavLink } from "react-router-dom";
import "./MovieCarouselItem.scss";
import Skeleton from "react-loading-skeleton";
import ModalTrailer from "../ModalTrailer/ModalTrailer";

export default function MovieCarouselItem({ movieItem  }) {
  let moment = require("moment");
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <div className="item__movie">
      <div className="item__link">
        <div className="item__img">
          <img src={movieItem.imageUrl} alt={movieItem.imageUrl } />
          <div className="overlay">
            <div
              className="play__button"
              style={{ cursor: "pointer" }}
              onClick={handleToggle}
            >
              <i className="fa fa-play play__icon" />
            </div>
          </div>
          <span className="film__age age--C">{movieItem.status}</span>
          <span className="film__audit">
            <p className="film__point">8</p>
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
            <i className="fa fa-star film__star" />
          </span>
        </div>
        <div className="item__info">
          <p className="film__name">{movieItem.title || <Skeleton />}</p>
          <span className="film__during">
            {moment(movieItem.dateStart).format("DD-MM-yyyy")}
          </span>
          <div className="item__button">
            <NavLink
              className="btn buyTicket__button"
              to={`/moviedetail/${movieItem.id}`}
            >
              ĐẶT VÉ
            </NavLink>
          </div>
        </div>
      </div>
      <ModalTrailer
        trailer={movieItem.trailer}
        movieId={movieItem.movieId}
        open={open}
        handleToggle={handleToggle}
      />
    </div>
  );
}
