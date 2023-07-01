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
  let [movieList, setMovieList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    movieManagement
      .getMovieList()
      .then((result) => {
        if (result) {
            setMovieList(result.data.dataList.datalist);
          setLoading(false);
          }

      })
      .catch((err) => {
        console.log(err.response.data.datalist);
      });
  }, []);
  return (
    <>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <Carousel />
          <ListMovie movieList={movieList} />
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
