import React, { Fragment } from "react";
import Carousel from "../components/Carousel/Carousel";
import ListMovie from "../components/ListMovie/ListMovie";
import News from "../components/News/News";
import AppMobile from "../components/AppMobile/AppMobile";
import ShowTimeHome from "../components/ShowTimeHome/ShowTimeHome";
import ScrollAnimation from "react-animate-on-scroll";
import { movieManagement } from "../services/MovieManagementServices";
import SpinnerLoading from "../components/SpinnerLoading/SpinnerLoading";

export default function Home() {
  let [danhSachPhim, setDanhSachPhim] = React.useState([]);
  const [loading, $loading] = React.useState(true);

  React.useEffect(() => {
    movieManagement
      .getMovieList()
      .then((result) => {
        if (result) {
          setTimeout(() => {
            setDanhSachPhim(result.data);
            $loading(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <Carousel />
          <ListMovie danhSachPhim={danhSachPhim} />
          <ScrollAnimation animateIn="fadeIn">
            <ShowTimeHome />
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn">
            <News />
          </ScrollAnimation>
          <AppMobile />
        </>
      )}
    </>
  );
}
