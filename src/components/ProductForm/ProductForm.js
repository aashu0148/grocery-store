import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import InputSelect from "components/InputControl/InputSelect/InputSelect";
import ImagePreview from "components/ImagePreview/ImagePreview";

import { validateImage } from "utils/util";

import styles from "./ProductForm.module.scss";

function ProductForm(props) {
  const discountTypeOptions = [
    {
      value: "Percentage",
      label: "Percentage",
    },
    {
      value: "Absolute",
      label: "Absolute",
    },
  ];
  const defaultValues = {
    discountType: discountTypeOptions[0],
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
    quantity: props.defaults?.quantity || "",
    category: props.defaults?.refCategory
      ? {
          value: props.defaults?.refCategory?._id,
          label: props.defaults?.refCategory?.name,
        }
      : "",
    subCategory: props.defaults?.refSubCategory
      ? {
          value: props.defaults?.refSubCategory?._id,
          label: props.defaults?.refSubCategory?.name,
        }
      : "",
    unit: props.defaults?.refUnit
      ? {
          value: props.defaults?.refUnit?._id,
          label: `${props.defaults?.refUnit?.name} (${props.defaults?.refUnit?.symbol})`,
        }
      : "",
    thumbnail: props.defaults?.thumbnail || "",
    images: props.defaults?.images || [],
    price: props.defaults?.price || 0,
    discount: props.defaults?.discount || 0,
  };

  const [values, setValues] = useState({
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
    quantity: props.defaults?.quantity || "",
    refCategory: props.defaults?.refCategory?._id || "",
    refSubCategory: props.defaults?.refSubCategory?._id || "",
    refUnit: props.defaults?.refUnit?._id || "",
    thumbnail: props.defaults?.thumbnail || "",
    images: props.defaults?.images?.length || [],
    price: props.defaults?.price || 0,
    discount: props.defaults?.discount || 0,
  });
  const [errors, setErrors] = useState({});
  const [thumbnail, setThumbnail] = useState(props.defaults?.thumbnail || "");
  const [images, setImages] = useState(
    props.defaults?.images?.length ? [...props.defaults?.images] : []
  );

  const handleThumbnailSelect = (event) => {
    const file = event.target?.files[0];
    const validationResult = validateImage(file);
    if (!validationResult.status) {
      setErrors({ ...errors, thumbnail: validationResult.message });
      return;
    }

    setErrors({ ...errors, thumbnail: "" });
    setThumbnail(file);
  };

  const handleThumbnailRemove = () => {
    setErrors({ ...errors, thumbnail: "" });
    setThumbnail("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Create New Product</div>

      <div className={styles.body}>
        <div className={styles.row}>
          <InputControl
            label="Product Title*"
            placeholder="Enter product title"
            defaultValue={defaultValues.title}
            onChange={(event) =>
              setValues({ ...values, title: event.target.value })
            }
          />
          <InputControl
            label="Price*"
            subLabel=" (per unit)"
            placeholder="Enter product price"
            defaultValue={defaultValues.price}
            onChange={(event) =>
              setValues({ ...values, price: parseInt(event.target.value) })
            }
          />
        </div>
        <div className={styles.formElem}>
          <label>
            Description* <span>(max length - 150)</span>
          </label>
          <textarea
            className={"basic-input"}
            maxLength={150}
            placeholder="Enter product description"
            defaultValue={defaultValues.description}
            onChange={(event) =>
              setValues({
                ...values,
                description: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.row}>
          <InputSelect label="Unit*" placeholder="Select product unit" />
          <InputControl
            label="Quantity*"
            type="number"
            min={1}
            max={10000}
            step={1}
            placeholder="Enter product quantity"
            defaultValue={defaultValues.quantity}
            onChange={(event) =>
              setValues({
                ...values,
                quantity: parseInt(event.target.value),
              })
            }
          />
        </div>
        <div className={styles.row}>
          <InputSelect
            label="Discount type"
            defaultValue={defaultValues.discountType}
            placeholder="Select discount type"
            options={discountTypeOptions}
          />
          <InputControl
            label="Discount"
            type="number"
            placeholder="Enter product discount"
            defaultValue={defaultValues.discount}
            onChange={(event) =>
              setValues({
                ...values,
                discount: parseFloat(event.target.value),
              })
            }
          />
        </div>
        <div className={styles.row}>
          <InputSelect
            label="Category*"
            placeholder="Select product category"
          />
          <InputSelect
            label="Sub Category*"
            placeholder="Select product sub-category"
          />
        </div>
        <div className={styles.formElem}>
          <label>
            Pick Thumbnail* <span>(max size - 2 MB)</span>
          </label>
          <div className={styles.equalRow}>
            <InputControl type="file" onChange={handleThumbnailSelect} />
            <div className={styles.row}>
              {thumbnail && (
                <ImagePreview
                  cropTitle="Crop Thumbnail"
                  src={typeof thumbnail === "string" ? thumbnail : null}
                  file={typeof thumbnail === "object" ? thumbnail : null}
                  isCrop
                  onDelete={handleThumbnailRemove}
                />
              )}
            </div>
          </div>
          {errors.thumbnail && <p className="error-msg">{errors.thumbnail}</p>}
        </div>
        <div className={styles.formElem}>
          <label>
            Pick Rest Images <span>(max - size(2 MB) , limit(4))</span>
          </label>
          <div className={styles.equalRow}>
            <InputControl type="file" multiple />
            <div className={styles.row}>
              {images?.map((item, index) => (
                <ImagePreview
                  key={index}
                  src={typeof item === "string" ? item : null}
                  file={typeof item === "object" ? item : null}
                  isCrop
                  cropTitle="Crop Image"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button cancel onClick={() => (props.onClose ? props.onClose() : "")}>
          Close
        </Button>

        <Button>Submit</Button>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  defaults: PropTypes.object,
  onClose: PropTypes.func,
};

export default ProductForm;
