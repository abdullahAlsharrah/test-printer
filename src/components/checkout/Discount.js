import React from "react";
import invoiceStore from "../../stores/invoiceStore";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { observer } from "mobx-react";

// import { View, Text, Button } from "react-native";

const Dicount = () => {
  const discount20 = () => {
    invoiceStore.discount === 0.2
      ? invoiceStore.setDiscount(0)
      : invoiceStore.setDiscount(0.2);
  };
  const discount50 = () => {
    invoiceStore.discount === 0.5
      ? invoiceStore.setDiscount(0)
      : invoiceStore.setDiscount(0.5);
  };
  return (
    <Row
      style={{
        flexDirection: "row",
        height: 50,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Button
        style={{
          // position: "absolute",
          bottom: 5,
          height: 50,
          width: "40%",
          marginRight: 5,
          backgroundColor: invoiceStore.discount === 0.5 ? "tomato" : "gray",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={discount50}>
        50%
      </Button>
      <Button
        style={{
          // position: "absolute",
          bottom: 5,
          height: 50,
          width: "40%",
          marginRight: 5,
          backgroundColor: invoiceStore.discount === 0.2 ? "tomato" : "gray",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={discount20}>
        20%
      </Button>
    </Row>
  );
};

export default observer(Dicount);
