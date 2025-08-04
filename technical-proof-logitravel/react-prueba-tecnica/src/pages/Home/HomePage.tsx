import React, { useState, useCallback } from "react";
import { ItemList, ButtonsBar } from "../../components/common";
import { Modal } from "../../components/ui";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="container">
      <p className="title">This is a technical proof</p>
      <p className="description">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
        inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
        hendrerit posuere augue fames dictumst placerat porttitor, dis mi
        pharetra vestibulum venenatis phasellus.
      </p>

      <ItemList />

      <ButtonsBar onOpenModal={handleOpenModal} />

      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default React.memo(HomePage);
