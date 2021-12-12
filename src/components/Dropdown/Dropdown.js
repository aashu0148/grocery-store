import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./Dropdown.module.scss";

function Dropdown(props) {
  const dropdown = useRef();

  const handleClick = (event) => {
    if (
      dropdown.current &&
      !dropdown.current.contains(event.target) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={dropdown}
      className={`${styles.dropDown} ${
        props.startFromRight ? styles.startFromRight : ""
      } ${props.className ? props.className : ""}`}
      style={props.style}
      onClick={(event) => event.stopPropagation()}
    >
      {props.children}
    </div>
  );
}

Dropdown.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  startFromRight: PropTypes.bool,
  className: PropTypes.string,
};

export default Dropdown;
