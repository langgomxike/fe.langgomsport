import FooterComponent from "../../components/Footer/Footer";
import RootLayout from "../../layouts/RootLayout";

export default function Home() {
  return (
    <RootLayout>
      <div className="container">
        {/* Menu */}
        <div className="menuContainer"></div>
        
        {/* Banners */}
        <div className="bannerConainer"></div>

        {/* Brands List*/}
        <div className="brandsContainer"></div>

        {/* New Product List */}
        <div className="newProductList"></div>

         {/* Sale Product List */}
         <div className="saleProductList"></div>

         {/* Collection */}
         <div className="collectionContainer"></div>

         {/* Policy notice  */}
         <div className="policyNoticeContainer"></div>
      </div>
    </RootLayout>
  );
}
