import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./detail.css";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadCrumbContainer";
import DetailInfo from "../../components/ProductDetail/product-detail";
import ProductDetailLeft from "../../components/ProductDetail/ProductDetailLeft";

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
            <ProductDetailLeft/>
          </Col>

          {/* image size, brand, ... */}
          <Col md={{ span: 6 }}>
            <DetailInfo/>
          </Col>
        </Row>

        {/* detail description */}
        <Row></Row>
      </Container>
    </RootLayout>
  );
}
