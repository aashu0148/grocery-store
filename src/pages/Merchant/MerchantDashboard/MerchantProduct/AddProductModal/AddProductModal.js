import React from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import Modal from "components/Modal/Modal";
import ProductForm from "components/ProductForm/ProductForm";

import { addNewProduct } from "api/merchant/product";

function AddProductModal(props) {
  const handleSubmission = (values) => {
    addNewProduct(values).then((res) => {
      if (!res) return;
      toast.success("Product added successfully");
      if (props.onClose) props.onClose();
    });
  };
  
  return (
    <Modal onClose={props.onClose}>
      <ProductForm onClose={props.onClose} onSubmit={handleSubmission} />
    </Modal>
  );
}

AddProductModal.propTypes = {
  onClose: PropTypes.func,
};

export default AddProductModal;
