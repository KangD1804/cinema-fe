import React, {useState} from "react";
import "../MovieInfo/MovieInfo.scss";
import ModalTrailer from "../../ModalTrailer/ModalTrailer";

export default function MovieInfo({ movieItem }) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  let moment = require("moment");

  const renderStar = (rating) => {
    if (rating > 5) rating = 5;
    let content = [];
    for (let i = 0; i < rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star" key={i}></i>);
      content.push(star);
    }
    for (let i = 0; i < 5 - rating; i++) {
      let star = [];
      star.push(<i className="fa fa-star-half-alt" key={i}></i>);
      content.push(star);
    }
    return content;
  };

  const countRatingMark = (rating) => {
    return rating * 0.5 + 10 * 0.5;
  };

  return (
    <section className="movieInfo">
      <div className="full__background">
        <img
          src={movieItem.imageUrl}
          alt={movieItem.imageUrl}
          style={{ height: "450px" }}
        />
        <div className="overlay__gradient" />
        <div className="play__mobile">
          <i className="fa fa-play" />
        </div>
        <div className="rating__point">
          <p className="film__point">{countRatingMark(movieItem.rating)}</p>
          <div className="rating__stars">{renderStar(movieItem.rating)}</div>
        </div>
      </div>
      <div className="form__info container">
        <div className="row">
          <div className="movie__poster text-left col-3">
            <div
              style={{ width: 220, height: 300 }}
              className="poster__img d-flex justify-content-center align-items-center"
            >
              <img
                className="w-100 h-100"
                src={movieItem.imageUrl }
                alt={movieItem.imageUrl }
              />
              <div className="play__btn" onClick={handleToggle}>
                <i className="fa fa-play" />
              </div>
            </div>
          </div>
          <div className="movie__info col-6">
            <div>
              <div className="showtime">
                {moment(movieItem.dateStart).format("DD-MM-yy")}
              </div>
              <div className="mb-3 d-flex justify-content-start align-items-center">
                <span className="age--C">{movieItem.status}</span>
                <span className="name">{movieItem.title}</span>
              </div>

              <p className="during">{movieItem.duration}</p>
              <p className="during">{movieItem.description}</p>
              <a href={"#movieTheater"}>
                <button className="bookTicket-btn">Mua Vé</button>
              </a>
            </div>
          </div>
          <div className="movie__rating d-flex justify-content-end col-3">
            <div>
              <div className="rating__point">
                {countRatingMark(movieItem.rating)}
                <div className="vongtronxanh"></div>
              </div>
              <div className="rating__stars">
                {renderStar(movieItem.rating)}
              </div>
              <div className="rating__text">
                {movieItem.rating} người đánh giá
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="film__infoMobile">
        <div className="days">
          {moment(movieItem.dateStart).format("DD-MM-yy")}
        </div>
        <div className="name">{movieItem.title}</div>
        <div className="during">{movieItem.duration}</div>
      </div>
      <ModalTrailer
        trailer={movieItem.trailer}
        movieId={movieItem.id}
        open={open}
        handleToggle={handleToggle}
      />
    </section>
  );
}
