import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../../../models/Product";
import "./tabMoreInfoDetail.css";
import tabs from "./detail-tabs.json";
import MarkdownPreview from "@uiw/react-markdown-preview";
import AProduct from "../../../apis/AProduct";
import Skeleton from "react-loading-skeleton";

export default function DetailScreen() {
  //contexts
  const location = useLocation();

  //states
  const productId: number = location.state ?? -1;
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [tab, setTab] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      AProduct.getProductById(productId, (product) => {
        setProduct(product);
        setLoading(false);
      });
    }, 2000);
  }, []);

  return (
    <RootLayout>
      <Container>
        {/* common information */}
        <Row style={{ minHeight: 500 }}>
          {/* image carousel */}
          <Col md={{ span: 6 }}></Col>

          {/* image size, brand, ... */}
          <Col md={{ span: 6 }}></Col>
        </Row>

        {/* detail description */}
        <Row>
          {/* tab headers */}
          <div className="detail-tab-container">
            {tabs.map((t) => (
              <div
                key={t.index}
                className={"detail-tab " + (t.index === tab && "active")}
                onClick={() => setTab(t.index)}
              >
                {t.title}
              </div>
            ))}
          </div>

          {(loading && <Skeleton className="detail-skeleton" />) || (
            <>
              {/* each specific tabs */}
              {/* tab shows description */}
              {tab === 1 &&
                ((product?.description && (
                  <div className="detail-container">
                    <MarkdownPreview
                      source={product.description}
                      wrapperElement={{ "data-color-mode": "light" }}
                    />
                  </div>
                )) || (
                  <p className="detail-container fst-italic text-center">
                    <img
                      src="./images/not-found.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <p>Sản phẩm không có mô tả</p>
                  </p>
                ))}

              {/* tab shows comments */}
              {tab === 2 && (
                <p className="detail-container fst-italic text-center">
                  <img
                    src="./images/developing-feature.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <p>Tính năng đang phát triển</p>
                </p>
              )}

              {/* tab shows reviews */}
              {tab === 3 && (
                <p className="detail-container fst-italic text-center">
                  <img
                    src="./images/developing-feature.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <p>Tính năng đang phát triển</p>
                </p>
              )}
            </>
          )}
        </Row>
      </Container>
    </RootLayout>
  );
}
