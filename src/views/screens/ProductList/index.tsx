import {Col, Container, Image, Row} from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import {useEffect, useState} from "react";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProductItem from "../../components/productItem/ProductItem";
import Header from "./header"
import SkeletonProductItem from "../../components/productItem/SkeletonProductItem";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import SizeFilter from "../../components/SizeFilter/SizeFilter";
import CategoryFilter from "../../components/Category/CategoryFIlter";
import Pagination from "../../components/Pagination/Pagination";
import ProductDTO from "../../../dtos/ProductDTO";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

const FAKE_LOADING_PRODUCTS = 20

export default function ProductListScreen() {
  //refs, contexts
  //state
  const [products, setProducts] = useState<Array<ProductDTO>>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100; // Ví dụ tổng số sản phẩm từ API
  const itemsPerPage = 10; // Số sản phẩm mỗi trang
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Tính số trang

  //handlers
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Cập nhật trang hiện tại
  };

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
      <div className="container py-5">
        <Row>
          {/* filter */}
          <Col md={{ span: 3 }}>
            {/*<h3>Here is the filter</h3>*/}
            {/* <h2>Here is the filter</h2> */}
            <CategoryFilter></CategoryFilter>
            <PriceFilter></PriceFilter>
            <SizeFilter />
          </Col>

        {/* product list */}
        <Col md={{ span: 9 }}>
          {/* Title of product list */}
          <Header/>

          <Container className="product-list-container">
            <Row>
              {/* when loading */}
              {loading &&
                  Array.from({length: FAKE_LOADING_PRODUCTS}).map((_, index)=> (
                      <Col
                          className="product-item-container"
                          key={index}
                          lg={12 / PRODUCTS_PER_ROW_IN_WEB}
                          sm={12 / PRODUCTS_PER_ROW_IN_TABLET}
                          xs={12 / PRODUCTS_PER_ROW_IN_MOBILE}
                      >
                        <SkeletonProductItem/>
                      </Col>
                  ))
              }

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
                      {
                        products.map((product) => (
                            <ProductItem product={product}/>
                        ))
                      }

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

          {/*  Pagination */}
          <div className="pagination-container">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
          </div>

        </Col>
      </Row>

      </div>
    </RootLayout>
  );
}
