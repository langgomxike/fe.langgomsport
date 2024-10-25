import ReactImageMagnify from "react-image-magnify";
import "./productDetailLeft.css";
import ImageSlider from "./ImageSlider";
import { useEffect, useState } from "react";
import ProductDetailLeftSkeleton from "./ProductDetailLeftSkeleton";
import File from "../../../models/File";


type ProductDetailLeftProps = {
  imagesData: File[] | undefined;
  loading: boolean;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ProductDetailLeft({imagesData, loading}: ProductDetailLeftProps) {
  
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (imagesData && imagesData.length > 0) {
      setMainImage(imagesData[0].filePath);
    }
  }, [imagesData]);

  const handleImageClick = (image: string) => {
    setMainImage(image); // Cập nhật ảnh lớn khi nhấn vào ảnh nhỏ
  };

  

  

  return (
    <>
    {loading && <ProductDetailLeftSkeleton/>} 
    {!loading && imagesData && mainImage &&
    <div>
      <div className="imageManify">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: `${BASE_URL}/${mainImage}`,
            },
            largeImage: {
              src: `${BASE_URL}/${mainImage}`,
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
      <ImageSlider images={imagesData} onImageClick={handleImageClick}/>
      
    </div>
      }
    </>
  );
}
