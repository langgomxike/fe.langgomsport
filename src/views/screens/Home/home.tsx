import RootLayout from "../../layouts/RootLayout";
import {useEffect, useState} from "react";
import Category from "../../../models/Category";
import CategoryInCategories from "../../../models/CategoryInCategories";
import ACategory from "../../../apis/ACategory";
import "./home.css";
import {Container} from "react-bootstrap";
import {ChevronDown} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Product from "../../../models/Product";
import AProduct from "../../../apis/AProduct";
import ProductCarousel from "../../components/ProductsCarousel/ProductCarousel";
import Banner from "../../../models/Banner";
import ABanner from "../../../apis/ABanner";
import Banners from "../../components/Banners/Banners";
import ACollection from "../../../apis/ACollection";
import CollectionComponent from "../../components/Collection/Collection";
import Collection from "../../../models/Collection";
import {MOBILE_MAX_WIDTH} from "../../components/Header/Header";


export default function Home() {
  //states
  const [categories, setCategories] = useState<CategoryInCategories[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [productSaleOff, setProductSaleOff] = useState<Product[]>([]);
  const [productNewest, setproductNewest] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);


  //handlers

  //effects
  useEffect(() => {
    ACategory.getAllCategories(categories => {
      setCategories(categories);
    }, () => {
    });
  }, []);

  useEffect(() => {
    // Lấy tất cả collection
    ACollection.getAllCollections((data) => {
      setCollections(data);
    }, setLoading);

    // Lấy tất cả banner
    ABanner.getAllBanners((data) => {
      setBanners(data);
      console.log("Banners: ", data);
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

  return (
    <RootLayout>
      {/* Menu */}
      {window.innerWidth > MOBILE_MAX_WIDTH && (
        <Container>
          <div className={"home-category-list"}>
            {categories.map(category => (
              <div key={category.categoryParent.id} className={"home-category-list-item"}>

                <Link className={"home-category-list-item-name"}
                      to={"/products?category_id=" + category.categoryParent.id}>
                  {category.categoryParent.name}
                </Link>

                {category.categories.length > 0 && (
                  <>
                    <ChevronDown className={"ms-1"}/>

                    <div className={"home-category-list-in-category"}>
                      {category.categories.map(categoryInList => (
                        <div key={categoryInList.id} className={"home-category-list-in-category-item"}>
                          <Link className={"home-category-list-item-name"}
                                to={"/products?category_id=" + categoryInList.id}>
                            {categoryInList.name}
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
      <div className="bannerContainer">
        <Banners banners={banners}/>
      </div>
      <div className="home container">
        {/* Brands List*/}
        <div className="brandsContainer"></div>

        {/* New Product List */}
        <div className="newProductList">
          <h2 className="home-title">Sản phẩm mới</h2>
          <ProductCarousel productList={productNewest} loading={loading}/>
        </div>

        {/* Sale Product List */}
        <div className="saleProductList">
          <h2 className="home-title">Sản phẩm sale off</h2>
          <ProductCarousel productList={productSaleOff} loading={loading}/>
        </div>

        {/* Collection */}
        <div className="collectionContainer">
          <CollectionComponent collections={collections}/>
        </div>

        {/* Policy notice  */}
        <div className="policyNoticeContainer"></div>
      </div>
    </RootLayout>
  )
}