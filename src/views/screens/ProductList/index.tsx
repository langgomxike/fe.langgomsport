import { Card, Col, Container, Image, Row } from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AProduct from "../../../apis/AProduct";
import ProductItem from "../../components/productItem/ProductItem";
import SkeletonProductItem from "../../components/productItem/SkeletonProductItem";
import CategoryFilter from "../../components/Category/CategoryFIlter";
import BrandFilter from "../../components/Brand/BrandFilter";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

const FAKE_LOADING_PRODUCTS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
];

export default function ProductListScreen() {
  //refs, contexts
  //state
  const [products, setProducts] = useState<Array<unknown>>([1,2,3,4,5,6]);
  const [loading, setLoading] = useState(true);

  //handlers

  //effects
  useEffect(() => {
    setTimeout(() => {
      // AProduct.getAllProducts((products) => {
      //   setProducts(products);
      //
      // });
      setLoading(false);
    }, 2000);
  }, []);

  //ui
  return (
    <RootLayout>
      <Row>
        {/* filter */}
        <Col md={{ span: 3 }}>
          {/* <h2>Here is the filter</h2> */}
          <CategoryFilter></CategoryFilter>
          <BrandFilter></BrandFilter>
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
                    <SkeletonProductItem/>
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
                      {/*<Card*/}
                      {/*  style={{ height: DEFAULT_PRODUCT_ITEM_HEIGHT + "px" }}*/}
                      {/*>*/}
                      {/*  {JSON.stringify(product)}*/}
                      {/*</Card>*/}
                      <ProductItem/>
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
          </Container>
        </Col>
      </Row>
    </RootLayout>
  );
}
