import React, { useState } from "react";

import Button from "components/Button/Button";
import AddProductModal from "../MerchantProduct/AddProductModal/AddProductModal";

function MerchantOverView() {
  const [showProductModal, setShowProductModal] = useState(false);
  return (
    <div>
      {showProductModal && (
        <AddProductModal onClose={() => setShowProductModal(false)} />
      )}
      <Button onClick={() => setShowProductModal((prev) => !prev)}>
        Add Product
      </Button>
    </div>
  );
}

export default MerchantOverView;
