import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-feather";

import ItemCard from "../ItemCard/ItemCard";

import styles from "./BasicCarousel.module.scss";

let timeout;
function BasicCarousel(props) {
  const itemsRef = useRef();
  const carouselRef = useRef();

  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);

  const scrollCarousel = (back) => {
    const carousel = carouselRef?.current;
    if (!carousel) return;

    const offset = 0.45 * carousel.clientWidth;
    if (back) carousel.scrollBy(offset * -1, 0);
    else carousel.scrollBy(offset, 0);
  };

  const handleScroll = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const carousel = carouselRef?.current;
      if (!carousel) return;

      if (carousel.clientWidth > itemsRef?.current?.clientWidth) {
        setLeftButtonDisabled(true);
        setRightButtonDisabled(true);
      } else {
        if (carousel.scrollLeft === 0) setLeftButtonDisabled(true);
        else setLeftButtonDisabled(false);
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          itemsRef?.current?.clientWidth - 5
        )
          setRightButtonDisabled(true);
        else setRightButtonDisabled(false);
      }
    }, 200);
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
    <div
      className={`${styles.container} ${
        props.mobileView ? styles.mobileContainer : ""
      }`}
    >
      {!leftButtonDisabled && (
        <div
          className={`${styles.control} ${styles.leftControl}`}
          onClick={() => scrollCarousel(true)}
        >
          <ChevronLeft />
        </div>
      )}
      {!rightButtonDisabled && (
        <div
          className={`${styles.control} ${styles.rightControl}`}
          onClick={() => scrollCarousel()}
        >
          <ChevronRight />
        </div>
      )}

      <div className={styles.containerInner} ref={carouselRef}>
        <div className={styles.items} ref={itemsRef}>
          {Array.isArray(props.items)
            ? props?.items?.map((item, index) => (
                <ItemCard
                  key={item?._id + index}
                  item={item}
                  onClick={props.onItemClick}
                  hideAddButton
                  mobileView={props.mobileView}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

BasicCarousel.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  mobileView: PropTypes.bool,
};

export default BasicCarousel;
