import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Crop, X } from "react-feather";

import ImageCrop from "components/ImageCrop/ImageCrop";

import galleryIcon from "assets/images/gallery.png";

import styles from "./ImagePreview.module.scss";

function ImagePreview({ isCrop, large, onDelete, cropTitle, file, src }) {
  const [currentFile, setCurrentFile] = useState(file);
  const [showCropModal, setShowCropModal] = useState(false);

  const convertUrlToImage = (url) => {
    fetch(url).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], new Date().toISOString() + ".png", {
        contentType,
      });
      setCurrentFile(file);
    });
  };

  useEffect(() => {
    setCurrentFile(file);
  }, [file]);

  useEffect(() => {
    if (src) {
      convertUrlToImage(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.container} ${large ? styles.large : ""}`}>
      {showCropModal && (
        <ImageCrop
          title={cropTitle}
          image={currentFile}
          outputFileName={currentFile ? currentFile?.name : ""}
          outputFileType={currentFile ? currentFile?.type : ""}
          onClose={() => setShowCropModal(false)}
          onCrop={(currentFile) => setCurrentFile(currentFile)}
        />
      )}
      <img
        src={currentFile ? URL.createObjectURL(currentFile) : galleryIcon}
        alt={"preview"}
      />
      <div
        className={styles.delete}
        onClick={() => (onDelete ? onDelete() : "")}
      >
        <X />
      </div>
      {isCrop && currentFile ? (
        <div
          className={styles.crop}
          onClick={() => setShowCropModal((prev) => !prev)}
        >
          <Crop />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

ImagePreview.propTypes = {
  isCrop: PropTypes.bool,
  cropTitle: PropTypes.string,
  large: PropTypes.bool,
  onDelete: PropTypes.func,
  file: PropTypes.object,
  src: PropTypes.string,
};

export default ImagePreview;
