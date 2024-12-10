import { useContext, useEffect, useState } from "react";
import RootLayout from "../../layouts/RootLayout";
import Product from "../../../models/Product";
import AProduct from "../../../apis/AProduct";
import "./home.css";
import ProductCarousel from "../../components/ProductsCarousel/ProductCarousel";
import Banner from "../../../models/Banner";
import ABanner from "../../../apis/ABanner";
import Banners from "../../components/Banners/Banners";
import ACollection from "../../../apis/ACollection";
import CollectionComponent from "../../components/Collection/Collection";
import Collection from "../../../models/Collection";
import { Container } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CategoryInCategories from "../../../models/CategoryInCategories";
import ACategory from "../../../apis/ACategory";
import { MOBILE_MAX_WIDTH } from "../../components/Header/Header";
import PolicyComponent from "../../components/Policy/Policy";
import ABrand from "../../../apis/ABrand";
import Brand from "../../../models/Brand";
import HomeBrand from "../../components/HomeBrand/HomeBrand";
import LanguageContext from "../../../configs/LanguageConfig";
import ConfigValue from "../../../configs/ConfigValue";

export default function Home() {
  // contexts, refs --------------------------------------------------------
  const language = useContext(LanguageContext).language;
  // states ----------------------------------------------------------------
  const [collections, setCollections] = useState<Collection[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [productSaleOff, setProductSaleOff] = useState<Product[]>([]);
  const [productNewest, setproductNewest] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryInCategories[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // handle ----------------------------------------------------------------

  // effects ----------------------------------------------------------------
  useEffect(() => {
    // Lấy tất cả thương hiệu
    ABrand.getHomeBrands((data) => {
      setBrands(data); // Cập nhật danh sách thương hiệu hiển thị
    }, setLoading);

    // Lấy tất cả collection
    ACollection.getAllCollections((data) => {
      setCollections(data);
    }, setLoading);

    // Lấy tất cả banner
    ABanner.getAllBanners((data) => {
      setBanners(data);
    }, setLoading);

    // Lấy tất cả sản phẩm sale off
    AProduct.getProductsSaleOff((data) => {
      setProductSaleOff(data);
    }, setLoading);

    // Lấy tất cả sản phẩm mới
    AProduct.getProductsNewest((data) => {
      setproductNewest(data);
    }, setLoading);
  }, []);

  useEffect(() => {
    ACategory.getAllCategories(
      (categories) => {
        setCategories(categories);
      },
      () => {}
    );
  }, []);

  return (
    <RootLayout>
      {/* Menu */}
      {window.innerWidth > MOBILE_MAX_WIDTH && (
        <Container>
          <div className={"home-category-list"}>
            {categories.map((category) => (
              <div
                key={category.categoryParent.id}
                className={"home-category-list-item"}
              >
                <Link
                  className={"home-category-list-item-name"}
                  to={"/products?category_id=" + category.categoryParent.id}
                >
                  {language.TYPE === ConfigValue.TYPE_VI ? category.categoryParent.name :   category.categoryParent.enName}
                </Link>

                {category.categories.length > 0 && (
                  <>
                    <ChevronDown className={"ms-1 chevron-down-category"} />

                    <div className={"home-category-list-in-category"}>
                      {category.categories.map((categoryInList) => (
                        <div
                          key={categoryInList.id}
                          className={"home-category-list-in-category-item"}
                        >
                          <Link
                            className={"home-category-list-item-name"}
                            to={"/products?category_id=" + categoryInList.id}
                          >
                            {language.TYPE === ConfigValue.TYPE_VI ?  categoryInList.name : categoryInList.enName}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Banners */}
      <div className="banner-container">
        <Banners banners={banners} />
      </div>
      <div className="home container">
        {/* Brands List*/}
        <div className="brands-container">
          <HomeBrand brands={brands} />
        </div>

        {/* New Product List */}
        <div className="newProductList">
          <h2 className="home-title">{language.NEW_PRODUCT}</h2>
          <ProductCarousel productList={productNewest} loading={loading} />
        </div>

        {/* Sale Product List */}
        <div className="saleProductList">
          <h2 className="home-title">{language.SALE_OFF_PRODUCT}</h2>
          <ProductCarousel productList={productSaleOff} loading={loading} />
        </div>

        {/* Collection */}
        <div className="collectionContainer">
          <CollectionComponent collections={collections} />
        </div>

        {/* Policy notice  */}
        <div className="policyNoticeContainer">
          <PolicyComponent />
        </div>
      </div>
    </RootLayout>
  );
}
