import React from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal/Modal";
import ProductForm from "components/ProductForm/ProductForm";

function AddProductModal(props) {
  return (
    <Modal onClose={props.onClose}>
      <ProductForm onClose={props.onClose} />
    </Modal>
  );
}

AddProductModal.propTypes = {
  onClose: PropTypes.func,
};

export default AddProductModal;
