import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Card, FloatingLabel, Form, ListGroup, Row } from "react-bootstrap";
import CheckoutItem from "./CheckoutItem";
import invoiceStore from "../../stores/invoiceStore";
import PaymentMethodModal from "./PaymentMethodModal";
import { observer } from "mobx-react";
import Dicount from "./Discount";
import axios from "axios";

function CheckoutList() {
  const [phone_number, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [modalShow, setModalShow] = React.useState(false);
  //   const branch = branchStore.branch;

  const items = invoiceStore.items.map((item) => (
    <CheckoutItem item={item} key={item.itemId} />
  ));
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  const handleCheckout = async (payment) => {
    invoiceStore.checkout(phone_number, payment, formatDate(date));
    setPhone();
    invoiceStore.setDiscount(0);
    setDate(new Date());
  };
  const hadnlePaymentMethhod = async () => {
    const data = {
      items: invoiceStore.items,
      paymentMethod: "Cash",
      total: invoiceStore.totalPrice,
    };
    await axios.post("http://localhost:8000/print", data);
    if (phone_number.toString().length >= 8) {
      setModalShow(true);
    } else {
      alert("Error", "Please Add a valid phone number", [
        { text: "OK", onPress: () => null, style: "cancel" },
      ]);
    }
  };
  return (
    <>
      <Card className="col-md-4 p-3" style={{ height: "90vh" }}>
        {/* Discounts */}
        <Dicount />
        <Card style={{ height: "90%" }} className="my-3 py-3 px-5">
          {/* Checkout list */}
          <FloatingLabel
            controlId="floatingInput"
            label="Phone number"
            className="mb-3">
            <Form.Control
              type="text"
              value={phone_number}
              placeholder="Phone number"
              onChange={(event) => setPhone(event.target.value)}
            />
          </FloatingLabel>
          {/* Title */}
          <Row className="justify-content-between">
            <p className="w-auto fw-bold">Services</p>
            <p className="w-auto fw-bold">Price</p>
          </Row>
          {/* Services */}
          <ListGroup className="border-0 list-group">{items}</ListGroup>
        </Card>
        <Button variant="dark" onClick={hadnlePaymentMethhod}>
          Checkout
          <p className="p-0 m-0">{invoiceStore.totalPrice} Kd</p>
        </Button>
      </Card>
      <PaymentMethodModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleCheckout={handleCheckout}
      />
    </>
  );
}

export default observer(CheckoutList);
