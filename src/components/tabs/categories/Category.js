import React from "react";
import { Card } from "react-bootstrap";

function Category({ category, type, setCategory, setPage }) {
  // const name = i18n.language === "ar" ? category.name_ar : category.name;
  const name = category.name;

  const handleSelection = () => {
    setCategory(category);
    setPage(type);
  };
  return (
    <Card
      className="d-flex justify-content-center align-items-center text-center m-1 item"
      onClick={handleSelection}>
      <p className="p-0 m-0">{name}</p>
    </Card>
  );
}

export default Category;
