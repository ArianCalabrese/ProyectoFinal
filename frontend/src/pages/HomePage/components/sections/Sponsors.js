import React from "react";
import InfiniteCarousel from "react-leaf-carousel";

const Sponsors = () => {
  return (
    <InfiniteCarousel
      breakpoints={[
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ]}
      dots={true}
      showSides={true}
      sidesOpacity={0.5}
      sideSize={0.1}
      slidesToScroll={4}
      slidesToShow={4}
      scrollOnDevice={true}
      autoCycle={true}
      cycleInterval={3000}
    >
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
      <div>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
    </InfiniteCarousel>
  );
};

export default Sponsors;
