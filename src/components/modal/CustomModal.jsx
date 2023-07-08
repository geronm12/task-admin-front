import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./CustomModal.css";

export const CustomModal = ({
  show,
  setShow,
  children,
  titulo,
  handleSave,
}) => {
  const handleClose = () => setShow(false);

  return (
    <div className="modal">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="warning" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
