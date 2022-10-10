import { observer } from "mobx-react";
import React from "react";
import { Card } from "react-bootstrap";
import invoiceStore from "../../../stores/invoiceStore";

function Item({ service, type }) {
  // const [showModal, setShowModal] = useState(false);

  const newItem = {
    quantity: 1,
    itemId: type + service.id,
    price: service.price,
    item_price: service.price,
    name: service.name,
    name_ar: service.name_ar,
  };
  const handleAdd = () => {
    invoiceStore.addItemToInvoice(newItem);
  };

  const foundItem = invoiceStore.items.find(
    (i) => i.itemId === type + service.id
  );
  // const name = i18n.language === "ar" ? service.name_ar : service.name;
  const className = foundItem ? "selected-item" : "";
  const name = service.name;
  return (
    <Card
      className={`d-flex justify-content-center align-items-center text-center m-1 item p-1 ${className}`}
      onClick={handleAdd}>
      <p>{name}</p>
      <p>{service.price} KD</p>
    </Card>
  );
}

export default observer(Item);
