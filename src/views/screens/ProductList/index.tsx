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
import GoHeaderButton from "../../components/GoHeadButton/goHeaderButton";
import CategoryItem from "../../components/Category/CategoryItem";
import BrandFilter from "../../components/Brand/BrandFilter";
import AProduct from "../../../apis/AProduct";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

const FAKE_LOADING_PRODUCTS = 20

export default function ProductListScreen() {
  //refs, contexts
  //state
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalItems: 0
  });

  const [filters, setFilters] = useState({
    categoryId: undefined,
    sizeId: undefined,
    brandId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });


  //handlers
  // handlers
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage, // Cập nhật số trang
    }));
  };

  // const updateFilter = (filterKey: string, value: any) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     [filterKey]: value
  //   }));
  //
  // };

  const updateFilter = (filterKey: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: Array.isArray(value) ? value : [value] // Đảm bảo giá trị là một mảng
    }));
    console.log(filters)
  };

  // Effects
  useEffect(() => {
    const fetchProducts = (page: number) => {
      AProduct.getProductsFilter(
          page,
          pagination.perPage,
          (data) => {
            setProducts(data.products);
            setPagination(data.pagination);
          },
          setLoading,
          filters.categoryId,
          filters.sizeId,
          filters.brandId,
          filters.minPrice,
          filters.maxPrice,
          undefined, // sort
      );
    };

    fetchProducts(pagination.page);
  }, [pagination.page, filters]); // Fetch lại khi pagination.page hoặc filters thay đổi

  //ui
  return (
    <RootLayout>
      <div className="container py-5">
        <Row>
          {/* filter */}
          <Col md={{ span: 3 }}>
            <CategoryFilter onFilterChange={(categoryId) => updateFilter('categoryId', categoryId)} />
            <PriceFilter onFilterChange={(minPrice, maxPrice) => {
              updateFilter('minPrice', minPrice);
              updateFilter('maxPrice', maxPrice);
            }} />
            <SizeFilter
                categoryId={filters.categoryId}
                onFilterChange={(sizeIds) => updateFilter('sizeId', sizeIds)}
            />
            {/*<BrandFilter onFilterChange={(brandId) => updateFilter('brandId', brandId)} />*/}
            {/*<SizeFilter categoryId={filters.categoryId} />*/}
            <BrandFilter />

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
                  products.map((product, index) => (
                    // item container
                    <Col
                      className="product-item-container"
                      key={index}
                      lg={12 / PRODUCTS_PER_ROW_IN_WEB}
                      sm={12 / PRODUCTS_PER_ROW_IN_TABLET}
                      xs={12 / PRODUCTS_PER_ROW_IN_MOBILE}
                    >
                      <ProductItem data={product}/>
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
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
          </div>

        </Col>
      </Row>

      </div>
    </RootLayout>
  );
}
