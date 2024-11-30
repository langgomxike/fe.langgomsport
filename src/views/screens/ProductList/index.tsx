import { Col, Container, Image, Row } from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import { useEffect, useState } from "react";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProductItem from "../../components/Product/ProductItem";
import Header from "./header";
import SkeletonProductItem from "../../components/Product/SkeletonProductItem";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import SizeFilter from "../../components/SizeFilter/SizeFilter";
import CategoryFilter from "../../components/Category/CategoryFIlter";
import PaginationComponent from "../../components/Pagination/Pagination";
import Product from "../../../models/Product";
import GoHeaderButton from "../../components/GoHeadButton/goHeaderButton";
import BrandFilter from "../../components/Brand/BrandFilter";
import AProduct from "../../../apis/AProduct";
import Pagination from "../../../models/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import ConfigValue from "../../../configs/ConfigValue";
import FooterComponent from "../../components/Footer/Footer";
import ABrand from "../../../apis/ABrand";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

let FAKE_LOADING_PRODUCTS = ConfigValue.PERPAGE_PRODUCT_LIMIT;

export default function ProductListScreen() {
  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());

  // Lấy giá trị của query parameter `category_id`
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category_id");
  // Get the price parameter
  const priceParam = queryParams.get("price");
  const sizesParam = queryParams.get("sizes");
  const brandsParam = queryParams.get("brands");
  const pageParam = queryParams.get("page");

  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedSizeIds, setSelectedSizeIds] = useState<number[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
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

    // queryParams.set("page", "1");
    // navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const fetchProducts = (page: number) => {
    AProduct.getProductsFilter(
      page,
      (data) => {
        // Tính giá giảm cho từng sản phẩm
        const updatedProducts = data.products.map((product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discount || 0
          );
          return {
            ...product,
            discountedPrice, // Thêm giá đã giảm vào sản phẩm
          };
        });

        setProducts(updatedProducts); // Cập nhật danh sách sản phẩm với giá đã giảm

        // Tính giá cao nhất từ danh sách sản phẩm, xem xét giá đã giảm (discountedPrice)
        const maxPrice = data.highestPrice;
        console.log("maxPrice: " + maxPrice);

        // Làm tròn giá trị cao nhất lên hàng triệu
        const roundedMaxPrice = Math.ceil(maxPrice / 1000000) * 1000000;

        setMaxPrice(roundedMaxPrice);

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
      filters.sort
    );
  };

  // Effects

  useEffect(() => {
    const brandId = queryParams.get("brandId");
    if (brandId) {
      const brandIdNumber = parseInt(brandId, 10);
      if (!isNaN(brandIdNumber)) {
        ABrand.getProductsByBrandId(
          brandIdNumber, 
          (data) => {
            setProducts(data);
            setLoading(false);
          },
          (loading) => {
            setLoading(loading);
          }
        );
      }
    }
  }, [queryParams]); // Điều này sẽ re-fetch khi queryParams thay đổi  
  

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
  useEffect(() => {
    if (categoryParam) {
      let categoryId = parseInt(categoryParam || "null", 10) || null;
      setCategoryId(categoryId);
      updateFilter("categoryId", categoryId);
    }

    if (priceParam) {
      let priceRange: number[] = [];
      priceRange = priceParam.split("-").map(Number); // Converts to an array of numbers
      updateFilter("minPrice", priceRange[0]);
      updateFilter("maxPrice", priceRange[1]);
    }

    if (sizesParam) {
      const sizeIds = sizesParam.split("-").map(Number);
      setSelectedSizeIds(sizeIds);
      updateFilter("sizeId", sizeIds);
    } else {
      updateFilter("sizeId", []);
    }

    if (brandsParam) {
      const brandIds = brandsParam.split("-").map(Number);
      setSelectedBrandIds(brandIds);
      updateFilter("brandId", brandIds);
    } else {
      updateFilter("brandId", []);
    }

    queryParams.delete("page");
    navigate(`${location.pathname}?${queryParams.toString()}`);

    console.log(">>> queryParams: " + queryParams);
  }, [categoryParam, priceParam, sizesParam, brandsParam]);

  useEffect(() => {
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage)) {
        handlePageChange(parsedPage);
      }
    }
  }, [pageParam]);

  function calculateDiscountedPrice(price: number, discount: number): number {
    if (!discount) return price; // Nếu không có discount, trả về giá gốc
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  }

  //ui
  return (
    <RootLayout>
      <GoHeaderButton />
      <div className="container py-5">
        <Row>
          {/* filter */}
          <Col md={{ span: 3 }}>
            <CategoryFilter categoryId={categoryId} />
            <PriceFilter maxPriceValue={maxPrice} />
            <SizeFilter
              categoryId={filters.categoryId}
              selectedSizeIds={selectedSizeIds}
            />
            <BrandFilter selectedBrandIds={selectedBrandIds} />
          </Col>

          {/* product list */}
          <Col md={{ span: 9 }}>
            {/* Title of product list */}
            <Header
              productQuantity={pagination.totalItems}
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
                  <Image src={"/images/empty-product-list.png"} />
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
