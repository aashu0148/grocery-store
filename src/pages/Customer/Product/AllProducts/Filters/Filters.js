import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";
import InputSelect from "components/InputControl/InputSelect/InputSelect";
import InputControl from "components/InputControl/InputControl";

import { getAllCategories } from "api/user/category";
import { sortingOptions } from "utils/constants";

import styles from "./Filters.module.scss";

function Filters(props) {
  const maxPriceValue = 3000;
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);
  const navigate = useNavigate();
  const isMobileView = props.mobileView ? true : false;

  const [allCategories, setAllCategories] = useState([]);
  const [price, setPrice] = useState([0, maxPriceValue]);
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: "",
    category: "",
  });
  const [filters, setFilters] = useState({
    search: "",
    refCategory: "",
    minimumPrice: "",
    maximumPrice: "",
    sortBy: "",
  });

  const fetchAllCategories = () => {
    getAllCategories().then((res) => {
      if (!res) return;
      setAllCategories(
        res.data?.map((item) => ({ value: item._id, label: item.name }))
      );
    });
  };

  const handleResetFilters = () => {
    const tempFilters = {
      search: "",
      refCategory: "",
      minimumPrice: "",
      maximumPrice: "",
      sortBy: "",
    };
    setSelectedOptions({ sortBy: "", category: "" });
    setPrice([0, maxPriceValue]);
    setFiltersToUrl(tempFilters);
    setFilters(tempFilters);
    if (props.onApply) props.onApply(tempFilters, true);
    if (props.onClose) props.onClose();
  };

  const setFiltersToUrl = (filters) => {
    if (
      !filters ||
      (!filters?.refCategory &&
        !filters.sortBy &&
        !filters.minimumPrice &&
        !filters.maximumPrice &&
        !filters.search)
    ) {
      navigate({
        search: "",
      });
      return;
    }
    const queryParams = new URLSearchParams();

    if (filters?.refCategory)
      queryParams.append("refCategory", filters?.refCategory);
    if (filters?.sortBy) queryParams.append("sortBy", filters?.sortBy);
    if (filters?.search) queryParams.append("search", filters?.search);
    if (filters?.minimumPrice)
      queryParams.append("minimumPrice", JSON.stringify(filters?.minimumPrice));
    if (filters?.maximumPrice)
      queryParams.append("maximumPrice", JSON.stringify(filters?.maximumPrice));
    if (selectedOptions.category)
      queryParams.append(
        "selectedCategory",
        JSON.stringify(selectedOptions?.category)
      );
    if (selectedOptions.sortBy)
      queryParams.append(
        "selectedSortBy",
        JSON.stringify(selectedOptions?.sortBy)
      );

    navigate({
      search: queryParams.toString(),
    });
  };

  const submission = () => {
    const tempFilters = { ...filters };
    if (price[0] && price[1] !== maxPriceValue) {
      tempFilters.minimumPrice = price[0];
      tempFilters.maximumPrice = price[1];
    } else if (price[0] && price[1] === maxPriceValue) {
      tempFilters.minimumPrice = price[0];
      tempFilters.maximumPrice = undefined;
    } else if (!price[0] && price[1] !== maxPriceValue) {
      tempFilters.minimumPrice = undefined;
      tempFilters.maximumPrice = price[1];
    } else {
      tempFilters.minimumPrice = "";
      tempFilters.maximumPrice = "";
    }

    setFiltersToUrl(tempFilters);
    if (props.onApply) props.onApply(tempFilters);
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilters({
      search: props?.filters?.search || "",
      refCategory: props?.filters?.refCategory || "",
      minimumPrice: props?.filters?.minimumPrice || "",
      maximumPrice: props?.filters?.maximumPrice || "",
      sortBy: props?.filters?.sortBy || "",
    });
    setSelectedOptions({
      sortBy: props?.filters?.selectedSortBy || selectedOptions.sortBy,
      category: props?.filters?.selectedCategory || selectedOptions.category,
    });
    setPrice([
      props?.filters?.minimumPrice || 0,
      props?.filters?.maximumPrice || maxPriceValue,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filters]);

  return (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      <div className={styles.header}>
        <p className={styles.heading}>Filter out results</p>
        <div className={styles.buttons}>
          <p
            className={`${styles.clear} styled-link`}
            onClick={handleResetFilters}
          >
            Clear
          </p>
          <Button onClick={submission}>Apply</Button>
        </div>
      </div>

      <div className={styles.body}>
        {!isMobileView && (
          <InputControl
            label="Search Product Name"
            placeholder="Type product name"
            value={filters.search || ""}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, search: event.target?.value }))
            }
          />
        )}
        <InputSelect
          label="Choose Category"
          placeholder="Select Category"
          options={allCategories}
          value={selectedOptions.category || ""}
          onChange={(item) => {
            setFilters((prev) => ({ ...prev, refCategory: item.value }));
            setSelectedOptions((prev) => ({ ...prev, category: item }));
          }}
        />
        <InputSelect
          label="Sort By"
          placeholder="Select sorting option"
          options={sortingOptions}
          value={selectedOptions.sortBy || ""}
          onChange={(item) => {
            setFilters((prev) => ({ ...prev, sortBy: item.value }));
            setSelectedOptions((prev) => ({ ...prev, sortBy: item }));
          }}
        />
        <div className={styles.slider}>
          <label>
            Price{" "}
            {price[0] !== 0 && price[1] !== maxPriceValue ? (
              <span>
                ({price[0]}-{price[1]})
              </span>
            ) : price[0] !== 0 ? (
              <span>
                ({" >"}
                {price[0]})
              </span>
            ) : price[1] !== maxPriceValue ? (
              <span>
                ({" <"}
                {price[1]})
              </span>
            ) : (
              ""
            )}
          </label>
          <Range
            min={0}
            max={maxPriceValue}
            step={100}
            defaultValue={price}
            tipFormatter={(value) =>
              value === maxPriceValue ? `₹${value}+` : `₹${value}`
            }
            onAfterChange={(value) => setPrice(value)}
            handleStyle={{
              backgroundColor: "#2ec971",
              borderColor: "#2ec971",
            }}
            activeDotStyle={{ borderColor: "#2ec971" }}
            trackStyle={[{ backgroundColor: "#2ec971" }]}
          />
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  onApply: PropTypes.func,
  filters: PropTypes.object,
  mobileView: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Filters;
