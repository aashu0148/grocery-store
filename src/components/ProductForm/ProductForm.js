import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import InputSelect from "components/InputControl/InputSelect/InputSelect";
import ImagePreview from "components/ImagePreview/ImagePreview";
import ProgressBar from "components/ProgressBar/ProgressBar.";
import Spinner from "components/Spinner/Spinner";
import Chip from "components/Chip/Chip";

import { getDiscountedPrice, getSubUnits, validateImage } from "utils/util";
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
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
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
    benefits: props.defaults?.benefits || "",
    storageTips: props.defaults?.storageTips || "",
    shelfLife: props.default?.shelfLife || "",
    storageTemperature: props.default?.storageTemperature || "",
  };

  const [values, setValues] = useState({
    title: props.defaults?.title || "",
    description: props.defaults?.description || "",
    availabilities: props.defaults?.availabilities || [],
    noOfProducts: props.defaults?.noOfProducts || "",
    refCategory: props.defaults?.refCategory?._id || "",
    refSubCategory: props.defaults?.refSubCategory?._id || "",
    refUnit: props.defaults?.refUnit?._id || "",
    thumbnail: props.defaults?.thumbnail || "",
    images: props.defaults?.images?.length || [],
    subCategory: props.defaults?.refSubCategory
      ? {
          value: props.defaults?.refSubCategory?._id,
          label: props.defaults?.refSubCategory?.name,
        }
      : "",
    benefits: props.defaults?.benefits || "",
    storageTips: props.defaults?.storageTips || "",
    shelfLife: props.default?.shelfLife || "",
    storageTemperature: props.default?.storageTemperature || "",
    unit: props.defaults?.refUnit || "",
  });
  const [errors, setErrors] = useState({});
  const [thumbnail, setThumbnail] = useState(props.defaults?.thumbnail || "");
  const [images, setImages] = useState(
    props.defaults?.images?.length ? [...props.defaults?.images] : []
  );
  const [currentAvailability, setCurrentAvailability] = useState({});
  const [currentDiscountType, setCurrentDiscountType] = useState(
    discountTypes.percentage
  );
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [units, setUnits] = useState([]);
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
        ...item,
        value: item._id,
        label: item.name,
      }));
      setCategories(categories);
    });
  };

  const fetchAllUnits = () => {
    getAllUnits().then((res) => {
      if (!res) return;

      const units = res.data?.map((item) => ({
        ...item,
        value: item._id,
        label: `${item.name} ${item.symbol?.trim() ? `(${item.symbol})` : ""}`,
      }));
      setUnits(units);
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!values.title) errors.title = "Enter title";
    if (!values.noOfProducts) errors.noOfProducts = "Enter number of products";
    else if (values.noOfProducts < 0)
      errors.noOfProducts = "Number of products should be greater than 0";
    if (!values.description) errors.description = "Enter description";
    if (!values.refCategory) errors.category = "Select category";
    if (!values.refSubCategory) errors.subCategory = "Select sub category";
    if (!values.refUnit) errors.unit = "Select unit";
    if (!thumbnail) errors.thumbnail = "Choose thumbnail";
    if (!values.shelfLife) errors.shelfLife = "Enter shelf life";
    if (!values.availabilities?.length)
      errors.availabilities = "Add product availability";

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

  const handleDiscountTypeChange = (item) => {
    setCurrentDiscountType(item.value);

    if (item.value === discountTypes.absolute) {
      setCurrentAvailability((prev) => ({
        ...prev,
        discount: prev?.price
          ? parseFloat(((prev.discount || 0) / 100) * prev.price).toFixed(1)
          : "",
      }));
    } else {
      setCurrentAvailability((prev) => ({
        ...prev,
        discount: prev?.price
          ? parseFloat(((prev.discount || 0) / prev.price) * 100).toFixed(1)
          : 0,
      }));
    }
  };

  const addAvailabilities = () => {
    if (values.availabilities?.length > 5) return;
    const availability = { ...currentAvailability };
    const errors = {};
    if (!availability?.price) errors.availabilityPrice = "Enter price";
    else if (parseInt(availability?.price) < 0)
      errors.availabilityPrice = "Price must be greater than 0";
    if (!availability?.refUnit) errors.availabilityUnit = "Select unit";
    if (!availability?.quantity) errors.availabilityQuantity = "Enter quantity";
    else if (parseInt(availability?.quantity) < 1)
      errors.availabilityQuantity = "Quantity must be greater than 1";

    if (availability?.discount && availability?.price) {
      if (
        currentDiscountType === discountTypes.absolute &&
        availability?.discount >= availability?.price
      ) {
        errors.availabilityDiscount = "Discount must be smaller than price";
      } else if (
        currentDiscountType === discountTypes.percentage &&
        availability?.discount > 99
      )
        errors.availabilityDiscount = "Discount should not be greater than 99%";
    }

    if (Object.keys(errors).length > 0) {
      setErrors((prev) => ({ ...prev, ...errors }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      availabilityDiscount: "",
      availabilityPrice: "",
      availabilityQuantity: "",
      availabilityUnit: "",
    }));

    const quantity = availability.quantity;

    const index = values.availabilities?.findIndex(
      (item) => item.quantity === quantity
    );
    if (index > -1) return;

    if (currentDiscountType === discountTypes.absolute) {
      availability.discount =
        (availability.discount / availability.price) * 100;
    }
    if (!availability?.discount) availability.discount = 0;

    setValues((prev) => ({
      ...prev,
      availabilities: [...prev.availabilities, availability],
    }));
    setCurrentAvailability({});
  };

  const removeAvailabilities = (quantity) => {
    const tempAvailabilities = [
      ...values.availabilities?.filter((item) => item?.quantity !== quantity),
    ];

    setValues((prev) => ({
      ...prev,
      availabilities: tempAvailabilities,
    }));
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
        </div>

        <div className={styles.row}>
          <InputControl
            label="Total Number of Products*"
            subLabel={`( in stock )`}
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
          <InputSelect
            label="Unit*"
            placeholder="Select product unit"
            options={units}
            error={errors.unit}
            onChange={(item) => {
              setValues({
                ...values,
                refUnit: item.value,
                unit: item,
                availabilities: [],
              });
              setCurrentAvailability((prev) => ({
                ...prev,
                refUnit: "",
                unit: "",
              }));
            }}
          />
        </div>

        <div className={styles.availability}>
          <label>Available In*</label>
          <div className={styles.row}>
            <InputControl
              label="Quantity*"
              type="number"
              min={1}
              max={100}
              step={1}
              placeholder="Enter quantity"
              value={currentAvailability?.quantity || ""}
              onChange={(event) =>
                setCurrentAvailability((prev) => ({
                  ...prev,
                  quantity: parseInt(event.target.value),
                }))
              }
              error={errors.availabilityQuantity}
            />
            <InputSelect
              label="Unit*"
              placeholder="Select unit"
              options={
                values?.unit?.name
                  ? getSubUnits(
                      values?.unit?.name,
                      units,
                      values?.availabilities
                    )
                  : []
              }
              value={currentAvailability?.unit || ""}
              onChange={(item) =>
                setCurrentAvailability({
                  ...currentAvailability,
                  refUnit: item.value,
                  unit: item,
                })
              }
              error={errors.availabilityUnit}
            />
            <InputControl
              label="Price*"
              subLabel={
                currentAvailability.quantity &&
                currentAvailability.refUnit &&
                currentAvailability.price
                  ? `( ${currentAvailability.quantity} ${
                      currentAvailability?.unit?.symbol || "unit"
                    } = ₹${currentAvailability.price} )`
                  : ""
              }
              type="tel"
              placeholder="Enter price"
              value={currentAvailability?.price || ""}
              onChange={(event) =>
                setCurrentAvailability({
                  ...currentAvailability,
                  price: parseInt(event.target.value),
                })
              }
              error={errors.availabilityPrice}
            />
          </div>
          <div className={`${styles.row} ${styles.buttonRow}`}>
            <InputSelect
              label="Discount type"
              defaultValue={discountTypeOptions[0]}
              placeholder="Select discount type"
              options={discountTypeOptions}
              onChange={handleDiscountTypeChange}
            />

            <InputControl
              label="Discount"
              subLabel={
                currentAvailability.price && currentAvailability?.discount
                  ? `( discounted price : ${
                      currentDiscountType === discountTypes.absolute
                        ? currentAvailability.price -
                          currentAvailability.discount
                        : getDiscountedPrice(
                            currentAvailability.price,
                            currentAvailability.discount
                          )
                    } )`
                  : ""
              }
              type="number"
              min={0}
              placeholder="Enter discount"
              value={currentAvailability?.discount || ""}
              onChange={(event) =>
                setCurrentAvailability({
                  ...currentAvailability,
                  discount: event.target.value,
                })
              }
              error={errors.availabilityDiscount}
            />
            <Button onClick={addAvailabilities}>Add</Button>
          </div>
          <div className={styles.availabilities}>
            {values.availabilities?.map((item) => (
              <Chip
                key={item?.quantity}
                red={item?.discount > 15}
                orange={item?.discount > 3 && item?.discount < 16}
                label={`₹${item.price} / ${
                  item.quantity > 1 ? item.quantity : ""
                }${item?.unit?.symbol || item?.refUnit?.symbol || "unit"} (-${
                  item?.discount
                }%)`}
                isClose
                onClose={() => removeAvailabilities(item?.quantity)}
              />
            ))}
          </div>
          {errors.availabilities && (
            <p className="error-msg">{errors.availabilities}</p>
          )}
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

        <h3>Extra Information</h3>
        <div className={styles.row}>
          <InputControl
            label="Shelf life*"
            type="number"
            min={0}
            subLabel="( in days )"
            value={values.shelfLife || ""}
            onChange={(event) =>
              event.target.value < 0
                ? ""
                : setValues((prev) => ({
                    ...prev,
                    shelfLife: parseInt(event.target.value),
                  }))
            }
            placeholder="Enter shelf life of product"
            error={errors.shelfLife}
          />

          <InputControl
            label="Storage Temperature"
            subLabel="( degC )"
            type="number"
            min={0}
            defaultValue={values.storageTemperature}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                storageTemperature: event.target.value,
              }))
            }
            placeholder="Enter recommended temp. for storage"
          />
        </div>

        <div className={styles.formElem}>
          <label>
            Nutrition value & Benefits <span>( max length - 100 )</span>
          </label>
          <textarea
            className={`basic-input`}
            maxLength={100}
            placeholder="Enter benefits of this product"
            defaultValue={defaultValues.benefits}
            onChange={(event) =>
              setValues({
                ...values,
                benefits: event.target.value,
              })
            }
          />
        </div>
        <div className={styles.formElem}>
          <label>
            Storage Tips <span>( max length - 100 )</span>
          </label>
          <textarea
            className={`basic-input`}
            maxLength={100}
            placeholder="Enter storage tips for this product"
            defaultValue={defaultValues.storageTips}
            onChange={(event) =>
              setValues({
                ...values,
                storageTips: event.target.value,
              })
            }
          />
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
