import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import instance from "../../../stores/instance";
import Item from "./Item";

function ItemList({ category }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  // const socket = useContext(SocketContext);

  // const branch = branchStore.branch;
  useEffect(() => {
    setLoading(true);
    const getServices = async () => {
      try {
        const res = await instance.get(
          `/${category.type}?categoryId=${category.id}&vendorId=${1}`
        );
        setServices(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // if (!venodrStore.loading) {
    getServices();
    // }
  }, [category.type, category.id]);
  if (loading) return <Spinner />;
  const servicesList = services.map((service) => (
    <Item service={service} key={service.id} type={category.type} />
  ));
  return <Row className="justify-content-center p-2">{servicesList}</Row>;
}

export default ItemList;
