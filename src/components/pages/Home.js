import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import TabsContainer from "../tabs/TabsContainer";
import CheckoutList from "../checkout/CheckoutList";
import authStore from "../../stores/authStore";

function Home() {
  useEffect(() => {
    authStore.checkForToken();
  });
  return (
    <Row className=" px-5 pt-5">
      <TabsContainer />
      <CheckoutList />
    </Row>
  );
}

export default Home;
