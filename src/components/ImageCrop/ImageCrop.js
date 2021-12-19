import React from "react";
import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";

import styles from "./ImageCrop.module.scss";

export default function ImageCrop(props) {
  const [imageToCrop, setImageToCrop] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "px",
    width: 100,
    height: 100,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [outputFile, setOutputFile] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const handleSubmit = () => {
    if (outputFile && props.onCrop) props.onCrop(outputFile);
    if (props.onClose) props.onClose();
  };

  const getFileFromImage = (image, crop) => {
    const canvas = document.createElement("canvas");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        if (!file) return;
        file.name = props.outputFileName || new Date().toISOString() + ".png";
        resolve(file);
      }, props.outputFileType || "image/jpeg");
    });
  };

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const crop = completedCrop;

    getFileFromImage(image, crop).then((file) => setOutputFile(file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop]);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageToCrop(reader.result));
    reader.readAsDataURL(props.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles.container}>
        <p className={styles.title}>{props.title || "Crop Picture"}</p>

        {!imageToCrop ? (
          ""
        ) : (
          <ReactCrop
            src={imageToCrop}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        )}

        <div className={styles.footer}>
          <Button cancel onClick={() => (props.onClose ? props.onClose() : "")}>
            Close
          </Button>

          <Button onClick={handleSubmit}>Crop</Button>
        </div>
      </div>
    </Modal>
  );
}

ImageCrop.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  onCrop: PropTypes.func,
  image: PropTypes.object,
  outputFileName: PropTypes.string,
  outputFileType: PropTypes.string,
};
