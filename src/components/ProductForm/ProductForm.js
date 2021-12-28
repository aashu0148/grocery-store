import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import InputSelect from "components/InputControl/InputSelect/InputSelect";
import ImagePreview from "components/ImagePreview/ImagePreview";
import ProgressBar from "components/ProgressBar/ProgressBar.";
import Spinner from "components/Spinner/Spinner";

import { getDiscountedPrice, validateImage } from "utils/util";
import { getAllUnits } from "api/user/unit";
import { imageUpload } from "utils/firebase";
import { getAllCategories } from "api/user/category";

import styles from "./ProductForm.module.scss";

function ProductForm(props) {
  const discountTypes = {
    absolute: "absolute",
    percentage: "percentage",
  };
  const discountTypeOptions = [
    {
      value: discountTypes.percentage,
      label: "Percentage",
    },
    {
      value: discountTypes.absolute,
      label: "Absolute",
    },
  ];
  const defaultValues = {
    discountType: discountTypeOptions[0],
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
    quantityOfProduct: props.defaults?.quantityOfProduct || "",
    noOfProducts: props.defaults?.noOfProducts || "",
    category: props.defaults?.refCategory
      ? {
          value: props.defaults?.refCategory?._id,
          label: props.defaults?.refCategory?.name,
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
    price: props.defaults?.price || "",
    discount: props.defaults?.discount || "",
  };

  const [values, setValues] = useState({
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
    quantityOfProduct: props.defaults?.quantityOfProduct || "",
    noOfProducts: props.defaults?.noOfProducts || "",
    refCategory: props.defaults?.refCategory?._id || "",
    refSubCategory: props.defaults?.refSubCategory?._id || "",
    refUnit: props.defaults?.refUnit?._id || "",
    thumbnail: props.defaults?.thumbnail || "",
    images: props.defaults?.images?.length || [],
    price: props.defaults?.price || 0,
    discount: props.defaults?.discount || "",
    subCategory: props.defaults?.refSubCategory
      ? {
          value: props.defaults?.refSubCategory?._id,
          label: props.defaults?.refSubCategory?.name,
        }
      : "",
  });
  const [errors, setErrors] = useState({});
  const [discountType, setDiscountType] = useState(discountTypes.percentage);
  const [thumbnail, setThumbnail] = useState(props.defaults?.thumbnail || "");
  const [images, setImages] = useState(
    props.defaults?.images?.length ? [...props.defaults?.images] : []
  );
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressText, setUploadProgressText] = useState(0);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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

  const handleThumbnailCrop = (file) => {
    setThumbnail(file);
  };

  const handleImagesSelect = (event) => {
    const filesObj = event.target?.files;
    const files = Object.keys(filesObj).map((item) => filesObj[item]);

    if (!files.length) return;
    const tempImages = [];

    files?.forEach((item) => {
      if (tempImages.length === 4) return;
      const validationResult = validateImage(item);
      if (!validationResult.status) {
        setErrors({ ...errors, images: validationResult.message });
      } else {
        setErrors({ ...errors, images: "" });
        tempImages.push(item);
      }
    });

    const requiredImage = [
      ...images,
      ...tempImages.slice(0, 4 - images.length),
    ];
    setImages(requiredImage);
  };

  const handleImagesRemove = (index) => {
    setErrors({ ...errors, images: "" });
    const tempImages = [...images];
    tempImages.splice(index, 1);
    setImages(tempImages);
  };

  const handleImagesCrop = (file, index) => {
    setErrors({ ...errors, images: "" });
    const tempImages = [...images];
    tempImages.splice(index, 1, file);
    setImages(tempImages);
  };

  const fetchAllCategories = () => {
    getAllCategories().then((res) => {
      if (!res) return;

      const categories = res.data?.map((item) => ({
        value: item._id,
        label: item.name,
        subCategory: item.subCategory,
      }));
      setCategories(categories);
    });
  };

  const fetchAllUnits = () => {
    getAllUnits().then((res) => {
      if (!res) return;

      const units = res.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.symbol?.trim() ? `(${item.symbol})` : ""}`,
      }));
      setUnits(units);
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!values.title) errors.title = "Enter title";
    if (!values.price) errors.price = "Enter price";
    else if (values.price < 0) errors.price = "Price should be greater than 0";
    if (!values.quantityOfProduct)
      errors.quantityOfProduct = "Enter quantity of product";
    else if (values.quantityOfProduct < 0)
      errors.quantityOfProduct = "Product Quantity should be greater than 0";
    if (!values.noOfProducts) errors.noOfProducts = "Enter number of products";
    else if (values.noOfProducts < 0)
      errors.noOfProducts = "Number of products should be greater than 0";
    if (discountType === discountTypes.percentage && values.discount > 99)
      errors.discount = "Discount must be smaller than 100%";
    else if (
      discountType === discountTypes.absolute &&
      values.discount >= values.price
    )
      errors.discount = "Discount must be smaller than price";
    if (!values.description) errors.description = "Enter description";
    if (!values.refCategory) errors.category = "Select category";
    if (!values.refSubCategory) errors.subCategory = "Select sub category";
    if (!values.refUnit) errors.unit = "Select unit";
    if (!thumbnail) errors.thumbnail = "Choose thumbnail";

    setErrors(errors);
    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  const handleImageUpload = async () => {
    const totalImages = [thumbnail, ...images];
    const requiredUrls = [];
    for (let i = 0; i < totalImages.length; ++i) {
      const item = totalImages[i];
      if (typeof item === "object") {
        const imagesCount = totalImages.filter(
          (item) => typeof item === "object"
        ).length;
        const url = await imageUpload(item, (progress) => {
          setUploadProgress(
            (prev) =>
              ((imagesCount * prev - ((imagesCount * prev) % 100) + progress) /
                (imagesCount * 100)) *
              100
          );
        });
        requiredUrls.push(url);
      } else requiredUrls.push(item);
    }
    return requiredUrls;
  };

  const handleSubmission = async () => {
    if (!validateForm()) return;
    setUploadProgress(1);
    setSubmitButtonDisabled(true);
    setUploadProgressText("Uploading images...");
    const urls = await handleImageUpload();
    setUploadProgressText("Adding Product...");

    const tempValues = { ...values };
    tempValues.thumbnail = urls[0];
    tempValues.images = [...urls.slice(1)];
    if (discountType === discountTypes.absolute) {
      tempValues.discount = (
        (tempValues.discount / tempValues.price) *
        100
      ).toFixed(1);
    }
    setValues(tempValues);
    if (props.onSubmit) props.onSubmit(tempValues);
    else toast.error("Can't add new product!");
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllUnits();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Add New Product</div>

      <div className={styles.body}>
        <div className={styles.row}>
          <InputControl
            label="Product Title*"
            placeholder="Enter product title"
            defaultValue={defaultValues.title}
            onChange={(event) =>
              setValues({ ...values, title: event.target.value })
            }
            error={errors.title}
          />
          <InputSelect
            label="Unit*"
            placeholder="Select product unit"
            options={units}
            error={errors.unit}
            onChange={(item) => {
              setValues({ ...values, refUnit: item.value });
              setSelectedUnit(item.label?.split("(")[0]);
            }}
          />
        </div>
        <div className={styles.row}>
          <InputControl
            label="Quantity*"
            subLabel="(w.r.t unit)"
            type="number"
            min={1}
            max={100}
            step={1}
            placeholder="Enter quantity of product"
            defaultValue={defaultValues.quantityOfProduct}
            onChange={(event) =>
              setValues({
                ...values,
                quantityOfProduct: parseInt(event.target.value),
              })
            }
            error={errors.quantityOfProduct}
          />
          <InputControl
            label="Price*"
            subLabel={
              values.quantityOfProduct && values.refUnit && values.price
                ? `( ₹ ${values.price} = ${values.quantityOfProduct} ${selectedUnit})`
                : ""
            }
            type="tel"
            placeholder="Enter product price"
            defaultValue={defaultValues.price}
            onChange={(event) =>
              setValues({ ...values, price: parseInt(event.target.value) })
            }
            error={errors.price}
          />
        </div>
        <div className={styles.formElem}>
          <label>
            Description* <span>(max length - 150)</span>
          </label>
          <textarea
            className={`basic-input ${
              errors.description ? "basic-input-error" : ""
            }`}
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
          {errors.description && (
            <p className="error-msg">{errors.description}</p>
          )}
        </div>

        <InputControl
          label="Total Number of Products*"
          subLabel="( in stock )"
          type="number"
          min={1}
          max={10000}
          step={10}
          placeholder="Enter number of products available"
          defaultValue={defaultValues.noOfProducts}
          onChange={(event) =>
            setValues({
              ...values,
              noOfProducts: parseInt(event.target.value),
            })
          }
          error={errors.noOfProducts}
        />

        <div className={styles.row}>
          <InputSelect
            label="Discount type"
            defaultValue={defaultValues.discountType}
            placeholder="Select discount type"
            options={discountTypeOptions}
            onChange={(item) => {
              item.value === discountTypes.percentage
                ? values.price
                  ? setValues({
                      ...values,
                      discount: parseFloat(
                        (values.discount / values.price) * 100
                      ).toFixed(1),
                    })
                  : setValues({ ...values, discount: 0 })
                : values.price
                ? setValues({
                    ...values,
                    discount: parseFloat(
                      (values.discount / 100) * values.price
                    ).toFixed(1),
                  })
                : setValues({ ...values, discount: 0 });
              setDiscountType(item.value);
            }}
          />

          <InputControl
            label="Discount"
            subLabel={
              values.price
                ? `( discounted price : ${
                    discountType === discountTypes.percentage
                      ? getDiscountedPrice(values.price, values.discount)
                      : values.price - values.discount
                  } )`
                : ""
            }
            type="number"
            min={0}
            placeholder="Enter product discount"
            value={values.discount + ""}
            onChange={(event) =>
              setValues({
                ...values,
                discount: event.target.value,
              })
            }
            error={errors.discount}
          />
        </div>
        <div className={styles.row}>
          <InputSelect
            label="Category*"
            placeholder="Select product category"
            options={categories}
            error={errors.category}
            defaultValue={defaultValues.category}
            onChange={(item) => {
              setSubCategories(
                item.subCategory.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))
              );
              setValues({
                ...values,
                refCategory: item.value,
                refSubCategory: "",
                subCategory: "",
              });
            }}
          />
          <InputSelect
            label="Sub Category*"
            placeholder="Select product sub-category"
            error={errors.subCategory}
            options={subCategories}
            value={values.subCategory}
            onChange={(item) =>
              setValues({
                ...values,
                refSubCategory: item.value,
                subCategory: item,
              })
            }
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
                  onCrop={handleThumbnailCrop}
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
            <InputControl type="file" multiple onChange={handleImagesSelect} />
            <div className={styles.row}>
              {images?.map((item, index) => (
                <ImagePreview
                  key={index + item + ""}
                  src={typeof item === "string" ? item : null}
                  file={typeof item === "object" ? item : null}
                  isCrop
                  cropTitle="Crop Image"
                  onDelete={() => handleImagesRemove(index)}
                  onCrop={(file) => handleImagesCrop(file, index)}
                />
              ))}
            </div>
          </div>
          {errors.images && <p className="error-msg">{errors.images}</p>}
        </div>
      </div>
      {uploadProgress > 0 && (
        <div>
          <ProgressBar progress={uploadProgress} />
          <p>{uploadProgressText}</p>
        </div>
      )}
      <div className={styles.footer}>
        <Button cancel onClick={() => (props.onClose ? props.onClose() : "")}>
          Close
        </Button>

        <Button disabled={submitButtonDisabled} onClick={handleSubmission}>
          Submit {submitButtonDisabled && <Spinner small white />}
        </Button>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  defaults: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ProductForm;
