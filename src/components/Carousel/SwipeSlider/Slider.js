import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./Slider.module.scss";

function Slider(props) {
  const sliderRef = useRef();

  const [activeSlideIndex, setActiveSlideIndex] = useState(
    props.activeSlideIndex || 0
  );

  const handleSliderScroll = (event) => {
    const leftScrolled = event.target?.scrollLeft;
    const width = Math.floor(sliderRef.current?.clientWidth);
    if (!width) return;
    const currentSlide = leftScrolled / width;

    const sliderOffset = currentSlide - Math.floor(currentSlide);
    if (sliderOffset < 0.2 || sliderOffset > 0.8)
      setActiveSlideIndex(Math.round(currentSlide));
  };

  useEffect(() => {
    if (props.onSlideChange) props.onSlideChange(activeSlideIndex);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlideIndex]);

  useEffect(() => {
    const slider = sliderRef?.current;
    if (!slider) return;
    if (props.activeSlideIndex === activeSlideIndex) return;
    const leftScroll =
      Math.floor(slider?.clientWidth) * parseInt(props.activeSlideIndex);

    slider?.scrollTo(leftScroll, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeSlideIndex]);

  useEffect(() => {
    const slider = sliderRef?.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleSliderScroll);

    return () => {
      slider.removeEventListener("scroll", handleSliderScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${props.class ? props.class : ""}`}
      ref={sliderRef}
    >
      {props.children}
    </div>
  );
}

const SliderItem = (props) => {
  return (
    <div className={`${styles.sliderItem} ${props.class ? props.class : ""}`}>
      {props.children}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.any,
  onSlideChange: PropTypes.func,
  activeSlideIndex: PropTypes.number,
  class: PropTypes.string,
};

SliderItem.propTypes = {
  class: PropTypes.string,
  children: PropTypes.any,
};

export { SliderItem };

export default Slider;
