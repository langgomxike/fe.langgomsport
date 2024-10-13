import { Card, Col, Container, Image, Row } from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AProduct from "../../../apis/AProduct";
import Pagination from "../../components/ExampleComponent/Pagination";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 2;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;
const DEFAULT_OFFSET = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

const FAKE_LOADING_PRODUCTS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
];

export default function ProductListScreen() {
  //refs, contexts
  //state
  const [products, setProducts] = useState<Array<unknown>>([]);
  const [loading, setLoading] = useState(false);

  //handlers

  //effects
  // useEffect(() => {
  //   setTimeout(() => {
  //     AProduct.getAllProducts((products) => {
  //       setProducts(products);
  //       setLoading(false);
  //     });
  //   }, 3000);
  // }, []);

  useEffect(() => {
    setProducts(FAKE_LOADING_PRODUCTS);
  }, []);

  //ui
  return (
    <RootLayout>
      <Row>
        {/* filter */}
        <Col md={{ span: 3 }}>
          <h2>Here is the filter</h2>
        </Col>

        {/* product list */}
        <Col md={{ span: 9 }}>
          <Container className="product-list-container">
            <Row>
              {/* when loading */}
              {loading &&
                FAKE_LOADING_PRODUCTS.map((_, index) => (
                  <Col
                    className="product-item-container"
                    key={index}
                    lg={12 / PRODUCTS_PER_ROW_IN_WEB}
                    sm={12 / PRODUCTS_PER_ROW_IN_TABLET}
                    xs={12 / PRODUCTS_PER_ROW_IN_MOBILE}
                  >
                    <Skeleton height={DEFAULT_PRODUCT_ITEM_HEIGHT + "px"} />
                  </Col>
                ))}

              {/* when having data */}
              {!loading &&
                products
                  .slice(0, MAX_AMOUNT_PRODUCTS_PER_PAGE)
                  .map((product, index) => (
                    // item container
                    <Col
                      className="product-item-container"
                      key={index}
                      lg={12 / PRODUCTS_PER_ROW_IN_WEB}
                      sm={12 / PRODUCTS_PER_ROW_IN_TABLET}
                      xs={12 / PRODUCTS_PER_ROW_IN_MOBILE}
                    >
                      <Card
                        style={{ height: DEFAULT_PRODUCT_ITEM_HEIGHT + "px" }}
                      >
                        {JSON.stringify(product)}
                      </Card>
                    </Col>
                  ))}
            </Row>

            {/* when empty */}
            {!loading && products.length < 1 && (
              <div className="product-list-empty">
                <Image src={"empty-product-list.png"} />
                <p className="text">{"Không tìm thấy sản phẩm"}</p>
              </div>
            )}

            {!loading && products.length > MAX_AMOUNT_PRODUCTS_PER_PAGE && (
              <div className="text-center">
                <Pagination defaultPage={5} total={products.length / MAX_AMOUNT_PRODUCTS_PER_PAGE} offset={DEFAULT_OFFSET}/>
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </RootLayout>
  );
} 
