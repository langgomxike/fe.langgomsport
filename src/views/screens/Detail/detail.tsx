import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./detail.css";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadCrumbContainer";
import DetailInfo from "../../components/ProductDetail/ProductDetail";
import ProductDetailSkeleton from "../../components/ProductDetail/ProductDetailSkeleton";
import RelatedProduct from "../../components/RelatedProduct/relatedProduct";
import Product from "../../../models/Product";
import ProductDetailLeft from "../../components/ProductDetail/ProductDetailLeft";
import "./tabMoreInfoDetail.css";
import tabs from "./detail-tabs.json";
import MarkdownPreview from "@uiw/react-markdown-preview";
import AProduct from "../../../apis/AProduct";
import Skeleton from "react-loading-skeleton";
import SkeletonProductItem from "../../components/ProductItem/SkeletonProductItem";

export default function DetailScreen() {
  //contexts
  const location = useLocation();

  //states
  const { id, name } = location.state || {};
  const productId: number =  id;
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    console.log(">>> id", productId);
    
     document.title = `${name} - Chi tiết sản phẩm`;

      AProduct.getProductById(productId, (product, realatedProducts) => {
        setProduct(product);
        document.title = `${product.name} - Chi tiết sản phẩm`;
        console.log(">>> product detail", product);
        
        setRelatedProducts(realatedProducts);
      }, setLoading);
  }, []);

  return (
    <RootLayout>
      <Container className="detail">
        {/* breadcrumb */}
        <BreadCrumbContainer />

        {/* common information */}
        <Row style={{ minHeight: 500 }}>
          {/* image carousel */}
          <Col md={{ span: 6 }}>
            <ProductDetailLeft/>
          </Col>

          {/* image size, brand, ... */}
          <Col md={{ span: 6 }}>
          {<DetailInfo detailData = {product} loading={loading}/>}
           
          </Col>
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
                    src="/images/developing-feature.png"
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
                    src="/images/developing-feature.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <p>Tính năng đang phát triển</p>
                </p>
              )}
            </>
          )}

        
        <RelatedProduct relatedProductsData={relatedProducts} loading={loading}/>
        </Row>
      </Container>
    </RootLayout>
  );
}
