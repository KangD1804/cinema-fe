import React, { Fragment } from "react";
import ShowTime from "../ShowTimes/ShowTime";
export default function TheaterCluster(props) {
  let { cumRap } = props;
  const renderCum = () => {
    return cumRap.map((cumRap, index) => {
      return (
        <div
          className="tab-pane fade show"
          id={cumRap.id}
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
          key={index}
        >
          <div className="secondary__row row">
            <div className="secondary__tab col-md-5 col-sm-12">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {renderCumRap(cumRap)}
              </div>
            </div>
            <div className="secondary__tabContent col-md-7 col-sm-12">
              <div className="tab-content" id="v-pills-tabContent">
                {renderShowTime(cumRap)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderShowTime = (cumRap) => {
    return cumRap.lstCumRap?.map((theatre, index) => {
      return (
        <div
          className="tab-pane fade show"
          id={theatre.maCumRap}
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
          key={index}
        >
          <div className="tab__list">
            <ul>
              <ShowTime theatre={theatre} maCumRap={theatre.maCumRap} />
            </ul>
          </div>
        </div>
      );
    });
  };
  const renderCumRap = (cumRap) => {
    return cumRap.lstCumRap?.map((theatre, index) => {
      return (
        <a
          className="nav-link"
          data-toggle="pill"
          href={`#${theatre.maCumRap}`}
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
          key={index}
        >
          <div className="img__theater">
            <img
              src="https://cdn2.iconfinder.com/data/icons/cinema-hall-and-movie-making/50/21-512.png"
              alt="sdsd"
            />
          </div>
          <div className="text__theater">
            <span className="name__theater">
              <span className="name__aftertheater">{theatre.tenCumRap}</span>
            </span>
            <p className="address__theater">{theatre.diaChi}</p>
            <span className="detail__theater">[chi tiết]</span>
          </div>
        </a>
      );
    });
  };
  return <Fragment>{renderCum()}</Fragment>;
}
