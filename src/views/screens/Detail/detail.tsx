import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./detail.css";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadCrumbContainer";
import DetailInfo from "../../components/ProductDetail/ProductDetail";
import RelatedProduct from "../../components/RelatedProduct/relatedProduct";
import Product from "../../../models/Product";
import ProductDetailLeft from "../../components/ProductDetail/ProductDetailLeft";
import "./tabMoreInfoDetail.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
import AProduct from "../../../apis/AProduct";
import Skeleton from "react-loading-skeleton";
import "./detail.css";
import FooterComponent from "../../components/Footer/Footer";
import LanguageContext from "../../../configs/LanguageConfig";

export default function DetailScreen() {
  //contexts
  const location = useLocation();
  const { slug } = useParams();
  const language = useContext(LanguageContext).language

  const tabs =
    [
      {
          "index": 1,
          "title": language.DETAILED_DESCRIPTION,
      },
      {
          "index": 2,
          "title": language.COMMENTS
      },
      {
          "index": 3,
          "title": language.REVIEWS
      }
  ]

  //states
  const { id, name } = location.state || {};
  
  const productId: number =  id;
  const [product, setProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [loading, setLoading] = useState(false);


  //useEffect
  useEffect(() => {
    
     document.title = `${name} - ${language.PRODUCT_DETAILS}|Langgomsport `;
      if(slug) {
        AProduct.getProductById(slug, (product, realatedProducts) => {
          setProduct(product);
          document.title = `${product.name} - ${language.PRODUCT_DETAILS}|Langgomsport`;
          
          setRelatedProducts(realatedProducts);
        }, setLoading);
      }
  }, [slug]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <RootLayout>
      {/* <GoHeaderButton /> */}
      <Container className="detail">
        {/* breadcrumb */}
        <BreadCrumbContainer onNext={()=>{}} category={product?.categories ? product.categories[product.categories.length -1] : undefined} />

        {/* common information */}
        <Row style={{ minHeight: 500 }}>
          {/* image carousel */}
          <Col md={{ span: 6 }}>
            <ProductDetailLeft imagesData={product?.images} loading={loading}/>
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
                      src="/images/not-found.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <span>{language.NO_DESCRIPTION}</span>
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
                  <p>{language.FEATURES_UNDER_DEVELOPMENT}</p>
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
                  <p>{language.FEATURES_UNDER_DEVELOPMENT}</p>
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
