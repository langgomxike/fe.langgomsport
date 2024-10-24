import ReactImageMagnify from "react-image-magnify";
import "./productDetailLeft.css";
import ImageSlider from "./ImageSlider";
import { useState } from "react";
import ProductDetailLeftSkeleton from "./ProductDetailLeftSkeleton";

const images = [
  "https://pos.nvncdn.com/be3294-43017/ps/20230411_VmJ2SfyO69.jpeg",
  "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/f9c222971b8f4d5fba78af23010708f9_9366/forum-exhibit-low-2.jpg",
  "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/12b322920da24ef1af17aee800f5af6a_9366/hyperturf-adventure-w.jpg",
  "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/d29e3f65af7a408e89bfaed7016b00b6_9366/gi%C3%A0y-sport-pro-adidas-x-lego.jpg",
  "https://th.bing.com/th/id/OIP.w-wHVliMYG6C95atW2_07wAAAA?w=383&h=383&rs=1&pid=ImgDetMain",
];

export default function ProductDetailLeft() {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setMainImage(image); // Cập nhật ảnh lớn khi nhấn vào ảnh nhỏ
  };

  return (
    <>
      <ProductDetailLeftSkeleton/>
      <div className="imageManify">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: mainImage,
            },
            largeImage: {
              src: mainImage,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerStyle: {
              zIndex: 1,
              borderWidth: 4,
            },
          }}
        />
      </div>
      <hr />
      <ImageSlider images={images} onImageClick={handleImageClick}/>
    </>
  );
}
