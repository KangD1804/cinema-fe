import React, { useState, useEffect, useMemo } from "react";
import { movieManagement } from "../services/MovieManagementServices";
import NewsDetailComponent from "../components/NewsDetailComponent/NewsDetailComponent";
import SpinnerLoading from "../components/SpinnerLoading/SpinnerLoading";

export default function DetailNews(props) {
  let [tinTuc, setTinTuc] = useState([]);
  const [loading, $loading] = useState(true);
  const maTinTuc = props.match.params.matintuc;
  useMemo(() => {
    movieManagement.getNewsDetail(maTinTuc).then((result) => {
      setTimeout(() => {
        setTinTuc(result.data);
        $loading(false);
      }, 1500);
    });
  }, [maTinTuc]);

  let [danhSachTinTuc, setDanhSachTinTuc] = useState([]);

  useEffect(() => {
    movieManagement
      .getNews()
      .then((res) => {
        setTimeout(() => {
          setDanhSachTinTuc(res.data);
          $loading(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <NewsDetailComponent tinTuc={tinTuc} danhSachTinTuc={danhSachTinTuc} />
      )}
    </React.Fragment>
  );
}
