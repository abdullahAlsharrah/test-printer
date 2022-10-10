import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import instance from "../../../stores/instance";
import Category from "./Category";

function CategoriesList({ type, setCategory, setPage }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const branch = branchStore.branch;
  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        const res = await instance.get(`/categories/${type}/${1}/${1}`);
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [type]);
  if (loading) return <Spinner />;
  const categoriesList = categories.map((category) => (
    <Category
      category={category}
      key={category.id}
      type={type}
      setCategory={setCategory}
      setPage={setPage}
    />
  ));
  return <Row className="justify-content-center p-2">{categoriesList}</Row>;
}

export default CategoriesList;
