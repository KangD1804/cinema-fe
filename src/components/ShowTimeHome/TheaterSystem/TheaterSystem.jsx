import React, { Fragment } from "react";
export default function TheaterSystem(props) {
  let { heThongRap } = props;
  const renderHeThongRap = () => {
    return heThongRap?.map((rap, index) => {
      return (
        <a
          className="nav-link d-flex justify-content-center align-items-center"
          id="v-pills-home-tab"
          data-toggle="pill"
          href={`#${rap.theatreSytemId}`}
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
          key={index}
        >
          <img src={rap.logo} alt={rap.theatreSytemId} />
        </a>
      );
    });
  };
  return <Fragment>{renderHeThongRap()}</Fragment>;
}
