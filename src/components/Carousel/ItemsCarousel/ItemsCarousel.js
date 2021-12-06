import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-feather";

import styles from "./ItemsCarousel.module.scss";

function ItemsCarousel() {
  const carouselRef = useRef();
  const itemsRef = useRef();

  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);

  const scrollCarousel = (back) => {
    const carousel = carouselRef?.current;
    if (!carousel) return;

    const offset = 0.4 * carousel.clientWidth;
    if (back) carousel.scrollBy(offset * -1, 0);
    else carousel.scrollBy(offset, 0);
  };

  const handleScroll = () => {
    const carousel = carouselRef?.current;
    if (!carousel) return;

    if (carousel.clientWidth > itemsRef?.current?.clientWidth) {
      setLeftButtonDisabled(true);
      setRightButtonDisabled(true);
    } else {
      if (carousel.scrollLeft === 0) setLeftButtonDisabled(true);
      else setLeftButtonDisabled(false);
      if (
        carousel.scrollLeft + carousel.clientWidth ===
        itemsRef?.current?.clientWidth
      )
        setRightButtonDisabled(true);
      else setRightButtonDisabled(false);
    }
  };

  useEffect(() => {
    handleScroll();

    const carousel = carouselRef?.current;
    if (!carousel) return;
    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.left}>
          <p className={styles.title}>breakfast & dairy</p>
          <p className={styles.desc}>butter, cheese, milk, curd and more</p>
        </div>
        <div className={styles.right}>
          <a className={styles.link}>see more {">"}</a>

          <div className={styles.buttons}>
            <button
              disabled={leftButtonDisabled}
              onClick={() => scrollCarousel(true)}
            >
              <ChevronLeft />
            </button>
            <button
              disabled={rightButtonDisabled}
              onClick={() => scrollCarousel()}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.body} ref={carouselRef}>
        <div className={styles.items} ref={itemsRef}></div>
      </div>
    </div>
  );
}

ItemsCarousel.propTypes = {
  items: PropTypes.array,
  link: PropTypes.string,
};

export default ItemsCarousel;
