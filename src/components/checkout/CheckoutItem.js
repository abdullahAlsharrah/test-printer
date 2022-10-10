import { observer } from "mobx-react";
import React from "react";
import { ListGroup, Row } from "react-bootstrap";
import invoiceStore from "../../stores/invoiceStore";
import { BsFillTrashFill } from "react-icons/bs";

function CheckoutItem({ item }) {
  const handleDelete = () => {
    invoiceStore.removeItemFromInvoice(item.itemId);
  };

  //   const { t, i18n } = useTranslation();

  //   const name = i18n.language === "ar" ? item.name_ar : item.name;
  const name = item.name;
  return (
    <ListGroup.Item className="checkout-item ">
      <Row>
        <p>{item.quantity}</p>
        <p>x </p>
        <p>
          {name} {item.is_package ? "package" : null}
        </p>
      </Row>
      <Row className="align-items-center">
        <p>
          {item.price} {"kd"}
        </p>
        <BsFillTrashFill onClick={handleDelete} color="tomato" />
      </Row>
    </ListGroup.Item>
  );
}

export default observer(CheckoutItem);
