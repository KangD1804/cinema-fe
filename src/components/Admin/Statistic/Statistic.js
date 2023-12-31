import React, { useEffect, useState } from "react";
import "./Statistic.scss";
import { movieManagement } from "../../../services/MovieManagementServices";
export default function Statistic() {
  let [lstHeThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    movieManagement
      .getTheaterSystems()
      .then((result) => {
        setHeThongRap(result.data.dataList);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, []);
  const renderRap = () => {
    return lstHeThongRap.map((theatre, index) => {
      return (
        <dd className={`percentage percentage-${index + 50}`} key={index}>
          <span className="text">
            {theatre.tenHeThongRap}
            <img
              src={theatre.logo}
              style={{ width: 40, height: 40 }}
              alt={theatre.logo}
            />
          </span>
        </dd>
      );
    });
  };
  return (
    <dl>
      <dt>Rạp movie được đặt vé nhiều nhất 2020</dt>
      {renderRap()}
    </dl>
  );
}
