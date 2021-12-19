import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

import styles from "../InputControl.module.scss";

function InputSelect({ label, error, async, asyncCreatable, ...rest }) {
  const colors = {
    primary: "#2ec971",
    red: "#ff5050",
    mediumGray: "#c5c5c5",
    lightGray: "#e2dfd6",
    textLightGray: "#9eaab7",
    textDark: "#100f29",
    textDarkGray: "#566474",
    greenishWhite: "#e4fff0",
  };

  const customSelectStyle = {
    control: (provided, { selectProps: { error }, isFocused }) => ({
      ...provided,
      height: 43,
      borderColor: colors.lightGray,
      boxShadow: error
        ? `0 0 0 1px ${colors.red}`
        : isFocused
        ? `0 0 0 1px ${colors.primary}`
        : "",
      "&:hover": {
        borderColor: isFocused || error ? "" : colors.mediumGray,
      },
    }),
    option: (provided, { isDisabled, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? colors.primary : "#fff",
      color: isSelected ? "#fff" : colors.textDarkGray,
      cursor: isDisabled ? "not-allowed" : "default",
      "&:hover": {
        backgroundColor: isSelected ? colors.primary : colors.greenishWhite,
      },
    }),
    input: (provided) => ({
      ...provided,
      maxWidth: "150px !important",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "1rem",
      color: colors.textLightGray,
      fontWeight: 400,
    }),
    menuList: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "1rem",
      color: colors.textDarkGray,
      fontWeight: 400,
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "1rem",
      color: colors.textDark,
      fontWeight: 400,
    }),
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectContainer}>
        {async ? (
          <AsyncSelect
            {...rest}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            styles={customSelectStyle}
            error={error ? true : false}
          />
        ) : asyncCreatable ? (
          <AsyncCreatableSelect
            {...rest}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            styles={customSelectStyle}
            error={error ? true : false}
          />
        ) : (
          <Select
            {...rest}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            styles={customSelectStyle}
            error={error ? true : false}
          />
        )}
      </div>
      {error ? <p className={styles.errorMsg}>{error}</p> : ""}
    </div>
  );
}

InputSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  async: PropTypes.bool,
  asyncCreatable: PropTypes.bool,
};

export default InputSelect;
