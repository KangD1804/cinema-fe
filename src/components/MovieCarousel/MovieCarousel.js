import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.scss";
import "swiper/swiper-bundle.min.css";
import MovieCarouselItem from "../MovieCarouselItem/MovieCarouselItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation } from "swiper";

export default function MovieCarousel({ list }) {
  SwiperCore.use([EffectCoverflow, Navigation]);

  const renderMovie = () => {
    return (
      <Swiper
        className="custom-swiper"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={true}
        breakpoints={{
          375: {
            width: 345,
            slidesPerView: 1,
            centeredSlides: false,
            modifier: 5,
          },
          640: {
            width: 640,
            centeredSlides: false,
            modifier: 5,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 3,
            centeredSlides: true,
          },
          1200: {
            width: 1200,
            slidesPerView: 5,
          },
        }}
      >
        {list?.map((movie, index) => {
          return (
            <SwiperSlide key={index}>
              <MovieCarouselItem movieItem ={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };
  return renderMovie();
}
