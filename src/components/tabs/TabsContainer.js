import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Services from "./Services";

function TabsContainer() {
  const [page, setPage] = useState("Main");

  return (
    <div className="col-md-8">
      <Tabs
        fill
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        onSelect={() => setPage("Main")}
        className="mb-3">
        <Tab eventKey="packages" title="Packages">
          <p>Packages</p>
        </Tab>
        <Tab eventKey="services" title="Services">
          <Services type={"services"} page={page} setPage={setPage} />
        </Tab>
        <Tab eventKey="offers" title="Offers">
          <Services type={"offers"} page={page} setPage={setPage} />
        </Tab>
        <Tab eventKey="products" title="Products">
          <Services type={"products"} page={page} setPage={setPage} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabsContainer;
