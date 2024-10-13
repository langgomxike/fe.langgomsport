import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";

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
      <Container>
        {/* common information */}
        <Row>
          {/* image carousel */}
          <Col md={{ span: 6 }}></Col>

          {/* image size, brand, ... */}
          <Col md={{ span: 6 }}></Col>
        </Row>

        {/* detail description */}
        <Row></Row>
      </Container>
    </RootLayout>
  );
}
