import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";

function Paginate(props) {
  const observingRef = useRef();

  useEffect(() => {
    const observingDiv = observingRef.current;
    if (!observingDiv) return;

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;

      if (isIntersecting && props.onEnd) props.onEnd();
    });

    observer.observe(observingDiv);

    return () => {
      observer.unobserve(observingDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {props.children}

      <div
        ref={observingRef}
        style={{
          position: "absolute",
          bottom: "0",
          height: window.innerHeight * 1.5 + "px",
        }}
      />
    </div>
  );
}

Paginate.propTypes = {
  onEnd: PropTypes.func,
};

export default Paginate;
