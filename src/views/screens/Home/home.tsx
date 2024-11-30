import { useEffect, useState } from "react";
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
import HomeBrand from "../../components/Brand/HomeBrand/HomeBrand";
import Brand from "../../../models/Brand";
import ABrand from "../../../apis/ABrand";

export default function Home() {
  // states ----------------------------------------------------------------
  const [collections, setCollections] = useState<Collection[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]); // Danh sách các thương hiệu
  const [productSaleOff, setProductSaleOff] = useState<Product[]>([]);
  const [productNewest, setproductNewest] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // handle

  // effects
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

    // Lấy tất cả thương hiệu
    ABrand.getAllBrands((data) => {
      setBrands(data); // Cập nhật danh sách thương hiệu hiển thị
      setLoading(false);
    }, setLoading);
  }, []);

  return (
    <RootLayout>
      {/* Menu */}
      <div className="menuContainer"></div>

      {/* Banners */}
      <div className="bannerContainer">
        <Banners banners={banners} />
      </div>

      <div className="home container">
        {/* Brands List*/}
        <div className="brandsContainer">
          <HomeBrand brands={brands} />
        </div>

        {/* New Product List */}
        <div className="newProductList">
          <h2 className="home-title">Sản phẩm mới</h2>
          <ProductCarousel productList={productNewest} loading={loading} />
        </div>

        {/* Sale Product List */}
        <div className="saleProductList">
          <h2 className="home-title">Sản phẩm sale off</h2>
          <ProductCarousel productList={productSaleOff} loading={loading} />
        </div>

        {/* Collection */}
        <div className="collectionContainer">
          <CollectionComponent collections={collections} />
        </div>

        {/* Policy notice */}
        <div className="policyNoticeContainer"></div>
      </div>
    </RootLayout>
  );
}
