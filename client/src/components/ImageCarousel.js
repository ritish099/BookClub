import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import ProductCard from "./ProductCardHome";
import "../styles/Products.css";

const ImageCarousel = ({Heading}) => {
  return (
    <div>
      <div className="Heading">{Heading}</div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item-padding-4-px"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 6,
          },
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1500,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 1000,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
        <ProductCard name="AB" price="100$" user="sd" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
