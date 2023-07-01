import React, { useState, useEffect } from "react";
import "./ShowTimeHome.scss";
import TheaterSystem from "./TheaterSystem/TheaterSystem";
import TheaterCluster from "./TheaterCluster/TheaterCluster";
import { movieManagement } from "../../services/MovieManagementServices";

export default function ShowTimeHome() {
  let [theatre, setTheatre] = useState([]);
  useEffect(() => {
    movieManagement
      .getTheaterSystems()
      .then((result) => {
        setTheatre(result.data.dataList);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, []);

  let [cumRap, setCumRap] = useState([]);
  useEffect(() => {
    movieManagement
      .getCinemaBySystem()
      .then((result) => {
        setCumRap(result.data.dataList);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, []);

  return (
    <section id="schedule" className="schedule container mx-auto">
      <div className="schedule__content">
        <div className="container">
          <h1 className="schedule__title text-center mb-4">Show Time</h1>
          <div className="schedule__row row bg-light">
            <div className="main__tab col-2">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                <TheaterSystem heThongRap={theatre} />
              </div>
            </div>
            <div className="main__tabContent col-md-10 col-sm-12">
              <div className="tab-content" id="v-pills-tabContent">
                {/* CGV THEATER */}
                <TheaterCluster cumRap={cumRap} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
