import React, { useState } from "react";
import CategoriesList from "./categories/CategoriesList";
import ItemList from "./items/ItemList";

function Services({ page, setPage, type }) {
  const [category, setCategory] = useState("Main");

  return page !== type ? (
    <CategoriesList type={type} setCategory={setCategory} setPage={setPage} />
  ) : (
    <ItemList category={category} />
  );
}

export default Services;
