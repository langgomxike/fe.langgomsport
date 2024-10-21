import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./detail.css";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadCrumbContainer";
import DetailInfo from "../../components/ProductDetail/product-detail";
import RelatedProduct from "../../components/RelatedProduct/relatedProduct";

export default function DetailScreen() {
  //contexts
  const location = useLocation();

  //states
  const productId: number = location.state ?? -1;

  //useEffect
  useEffect(() => {
    console.log(productId);
  }, []);

  return (
    <RootLayout>
      <Container className="detail-container">
        {/* breadcrumb */}
        <BreadCrumbContainer />

        {/* common information */}
        <Row>
          {/* image carousel */}
          <Col md={{ span: 6 }}>
            <img
              className="img-fluid"
              src="https://pos.nvncdn.com/be3294-43017/ps/20230411_VmJ2SfyO69.jpeg"
            />
          </Col>

          {/* image size, brand, ... */}
          <Col md={{ span: 6 }}>
            <DetailInfo />
          </Col>
        </Row>

        {/* detail description */}
        <Row>
          <RelatedProduct />
        </Row>
      </Container>
    </RootLayout>
  );
}
