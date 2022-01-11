import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Slider, { SliderItem } from "../SwipeSlider/Slider";

import styles from "./MainCarouselMobile.module.scss";

let autoInterval,
  updateTimerRunning = false;
function MainCarouselMobile(props) {
  const carouselOptions = props.slides || [];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const updateActiveIndex = (index) => {
    if (updateTimerRunning) return;

    setActiveSlideIndex(index);
    updateTimerRunning = true;
    setTimeout(() => {
      updateTimerRunning = false;
    }, 600);
  };

  useEffect(() => {
    if (!autoInterval)
      autoInterval = setInterval(() => {
        setActiveSlideIndex((prev) => prev + 1);
      }, 7000);

    return () => {
      clearInterval(autoInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeSlideIndex === carouselOptions?.length) updateActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlideIndex]);

  return (
    <div className={styles.container}>
      <Slider
        activeSlideIndex={activeSlideIndex}
        class={styles.slider}
        onSlideChange={updateActiveIndex}
      >
        {carouselOptions.map((item, index) => (
          <SliderItem class={styles.imageContainer} key={item.id + index}>
            {item.link ? (
              <a target="_blank" rel="noreferrer" href={item.link}>
                <img src={item.image} alt={item.title} />
              </a>
            ) : (
              <img src={item.image} alt={item.title} />
            )}
          </SliderItem>
        ))}
      </Slider>

      <div className={styles.footer}>
        {carouselOptions?.map((item, index) => (
          <div
            key={"" + item.id + index}
            className={`${styles.dot} ${
              index === activeSlideIndex ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

MainCarouselMobile.propTypes = {
  slides: PropTypes.array,
};

export default MainCarouselMobile;
