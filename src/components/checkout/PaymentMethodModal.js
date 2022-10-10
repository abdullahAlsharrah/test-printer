import React from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PaymentMethodModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Method
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Selcet Payment Method</h4>
        <Row className="justify-content-around">
          <Button
            onClick={() => props.handleCheckout("cash")}
            className="w-auto">
            Cash
          </Button>
          <Button
            onClick={() => props.handleCheckout("knet")}
            className="w-auto">
            K-net
          </Button>
          <Button
            onClick={() => props.handleCheckout("online")}
            className="w-auto">
            Online
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PaymentMethodModal;
