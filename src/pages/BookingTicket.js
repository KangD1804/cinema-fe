import React, { Fragment, useState, useEffect } from "react";
import ChooseSlot from "../components/BookingSlot/ChooseSlot/ChooseSlot";
import Checkout from "../components/BookingSlot/Checkout/Checkout";
import { movieManagement } from "../services/MovieManagementServices";
export default function BookingTicket(props) {
  let [thongTinPhongVe, setThongTinPhongVe] = useState({});
  let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);
  let { maLichChieu } = props.match.params;
  useEffect(() => {
    movieManagement
      .getShowtimesInfo(maLichChieu)
      .then((result) => {
        setThongTinPhongVe(result.data.dataList);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, [maLichChieu]);
  return (
    <Fragment>
      <div className="container-fluid bg-light" style={{ paddingTop: 20 }}>
        <div className="bookTicket__content row mt-5">
          <ChooseSlot
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
            setDanhSachGheDangDat={setDanhSachGheDangDat}
          />
          <Checkout
            param={props}
            thongTinPhongVe={thongTinPhongVe}
            danhSachGheDangDat={danhSachGheDangDat}
          />
        </div>
      </div>
    </Fragment>
  );
}
