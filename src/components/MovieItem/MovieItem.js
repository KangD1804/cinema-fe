import React from "react";
import "./MovieItem.scss";
import ModalTrailer from "../ModalTrailer/ModalTrailer";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function MovieItem({ movieItem  }) {
  let moment = require("moment");
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <div className="movie-card col-md-6 col-sm-12">
      <NavLink className="card-link" to={`/moviedetail/${movieItem.id}`}>
        <div className="card-content">
          <div className="content-left">
            <div className="left-header-movie">
              <h1 className="movie-name">{movieItem.title}</h1>
              <h4 className="group-id">{movieItem.status}</h4>
              <p className="during-time">{movieItem.duration}</p>
              <p className="date-time">
                {moment(movieItem.dateStart).format("DD-MM-yyyy")}
              </p>
            </div>
            <div className="below-header">
              <p className="description">{movieItem.summary}</p>
            </div>
          </div>
          <LazyLoad throttle={200}>
            <CSSTransition
              key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div
                className="content-right"
                style={{ backgroundImage: `url(${movieItem.imageUrl})` }}
              ></div>
            </CSSTransition>
          </LazyLoad>
        </div>
      </NavLink>
      <div className="play-trailer" onClick={handleToggle}>
        <i className="play-icon fa fa-play"></i>
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
