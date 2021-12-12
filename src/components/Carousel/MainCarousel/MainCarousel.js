import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import styles from "./MainCarousel.module.scss";

let autoInterval;
function MainCarousel(props) {
  const carouselOptions = props.slides || [];
  // schema for slides -
  // id: "23we23g unique",
  // icon: "url",
  // image:"anyurl",
  // title: "Beauty",

  const carouselRef = useRef();
  const [checkpoints, setCheckpoints] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handleSlideChange = (index) => {
    const carousel = carouselRef?.current;
    if (!carousel) return;

    setCheckpoints((prev) => {
      const startPoint = prev[index];

      carousel.scrollTo(startPoint, 0);
      setActiveItemIndex(index);
      return prev;
    });
  };

  const autoChangeSlide = () => {
    setActiveItemIndex((prev) => {
      if (prev === carouselOptions.length - 1) handleSlideChange(0);
      else handleSlideChange(prev + 1);
      return prev;
    });
  };

  const handleResize = () => {
    const carousel = carouselRef?.current;
    if (!carousel) return;
    const width = carousel?.clientWidth;
    const itemsCount = carouselOptions?.length;
    const tempCheckpoints = [];
    for (let i = 0; i < itemsCount; ++i) {
      tempCheckpoints.push(i * width);
    }
    
    setCheckpoints(tempCheckpoints);
  };

  useEffect(() => {
    handleResize();

    if (!autoInterval) autoInterval = setInterval(autoChangeSlide, 7000);

    window.addEventListener("resize", handleResize);

    if (checkpoints.length === -1) console.log("Dummy line"); // this line dont do anything just added to use checkpoint state and to remove warning of ubsed vars

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div ref={carouselRef} className={styles.innerContainer}>
        {carouselOptions.map((item, index) => (
          <div className={styles.imageContainer} key={item.id + index}>
            {item.link ? (
              <a target="_blank" rel="noreferrer" href={item.link}>
                <img src={item.image} alt={item.title} />
              </a>
            ) : (
              <img src={item.image} alt={item.title} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        {carouselOptions.map((item, index) => (
          <div
            key={item.title + index}
            className={`${styles.item} ${
              activeItemIndex === index ? styles.itemActive : ""
            }`}
            onClick={() => handleSlideChange(index)}
          >
            {item.icon && <img src={item.icon} alt={item.title} />}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

MainCarousel.propTypes = {
  slides: PropTypes.array,
};

export default MainCarousel;
