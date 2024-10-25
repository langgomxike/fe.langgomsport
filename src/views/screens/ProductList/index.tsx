import { Col, Container, Image, Row } from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import { useEffect, useState } from "react";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProductItem from "../../components/productItem/ProductItem";
import Header from "./header";
import SkeletonProductItem from "../../components/productItem/SkeletonProductItem";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import SizeFilter from "../../components/SizeFilter/SizeFilter";
import CategoryFilter from "../../components/Category/CategoryFIlter";
import PaginationComponent from "../../components/Pagination/Pagination";
import Product from "../../../models/Product";
import GoHeaderButton from "../../components/GoHeadButton/goHeaderButton";
import BrandFilter from "../../components/Brand/BrandFilter";
import AProduct from "../../../apis/AProduct";
import Pagination from "../../../models/Pagination";
import { useLocation } from "react-router-dom";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

let FAKE_LOADING_PRODUCTS = 20;

export default function ProductListScreen() {
  //refs, contexts

  //location
  const location = useLocation()
  const {category_id} = location.state || {}

  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());
  const [categoryName, setCategoryName] = useState("");

  const [filters, setFilters] = useState({
    categoryId: undefined,
    sizeId: undefined,
    brandId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
  });

  //handlers
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage, // Cập nhật số trang
    }));
  };

  const updateFilter = (filterKey: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: Array.isArray(value) ? value : [value], // Đảm bảo giá trị là một mảng
    }));

    // Reset lại trang hiện tại về 1 sau khi cập nhật bộ lọc
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const fetchProducts = (page: number) => {
    AProduct.getProductsFilter(
      page,
      pagination.perPage,
      (data) => {
        setProducts(data.products);
        setPagination((prev) => {
          const updatedPagination = data.pagination;
          return updatedPagination;
        });
      },
      setLoading,
      filters.categoryId,
      filters.sizeId,
      filters.brandId,
      filters.minPrice,
      filters.maxPrice,
      filters.sort // sort
    );
  };
  //
  // console.log(pagination)

  // Effects
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    // Nếu timeout trước đó tồn tại, hủy nó
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setLoading(true);
    // Thiết lập một timeout mới để gọi API sau 100ms

    timeoutId = setTimeout(() => {
      fetchProducts(pagination.page);
    }, 500);

    // Cleanup để hủy timeout khi component bị unmount hoặc filter/pagination thay đổi nhanh
    return () => clearTimeout(timeoutId);
  }, [pagination.page, filters]); // Fetch lại khi pagination.page hoặc filters thay đổi

  //lấy lại filter khi chuyển từ trang detail về 
  useEffect(()=>{
    updateFilter("categoryId", category_id)
  }, [category_id])

  //ui
  return (
    <RootLayout>
      <GoHeaderButton />
      <div className="container py-5">
        <Row>
          {/* filter */}
          <Col md={{ span: 3 }}>
            <CategoryFilter
              onFilterChange={(categoryId, categoryName: string) => {
                updateFilter("categoryId", categoryId);
                setCategoryName(categoryName);
              }}
            />
            <PriceFilter
              onFilterChange={(minPrice, maxPrice) => {
                updateFilter("minPrice", minPrice);
                updateFilter("maxPrice", maxPrice);
              }}
            />
            <SizeFilter
              categoryId={filters.categoryId}
              onFilterChange={(sizeIds) => updateFilter("sizeId", sizeIds)}
            />
            <BrandFilter
              onFilterChange={(brandIds) => updateFilter("brandId", brandIds)}
            />
          </Col>

          {/* product list */}
          <Col md={{ span: 9 }}>
            {/* Title of product list */}
            <Header
              productQuantity={pagination.totalItems}
              categoryName={categoryName}
              onFilterChange={(sort) => updateFilter("sort", sort)}
              setPageFirst={(page) => handlePageChange(page)}
            />

            <Container className="product-list-container">
              <Row>
                {/* when loading */}
                {loading &&
                  Array.from({ length: FAKE_LOADING_PRODUCTS }).map(
                    (_, index) => (
                      <Col
                        className="product-item-container"
                        key={index}
                        lg={12 / PRODUCTS_PER_ROW_IN_WEB}
                        sm={12 / PRODUCTS_PER_ROW_IN_TABLET}
                        xs={12 / PRODUCTS_PER_ROW_IN_MOBILE}
                      >
                        <SkeletonProductItem />
                      </Col>
                    )
                  )}

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
                      <ProductItem data={product} />
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
              {!loading && pagination.totalPages > 1 && (
                <PaginationComponent
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </RootLayout>
  );
}
