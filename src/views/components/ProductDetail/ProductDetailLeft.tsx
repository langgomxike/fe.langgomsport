import ReactImageMagnify from "react-image-magnify";
import "./productDetailLeft.css";
import ImageSlider from "./ImageSlider";
import { useEffect, useState } from "react";
import ProductDetailLeftSkeleton from "./ProductDetailLeftSkeleton";
import File from "../../../models/File";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type ProductDetailLeftProps = {
  imagesData: File[] | undefined;
  loading: boolean;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ProductDetailLeft({
  imagesData,
  loading,
}: ProductDetailLeftProps) {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (imagesData && imagesData.length > 0) {
      setMainImage(imagesData[0].filePath);
    }
  }, [imagesData]);

  useEffect(() => {
    if (imagesData && imagesData.length > 0) {
      setMainImage(imagesData[0].filePath);
    }

    // Kiểm tra thiết bị di động
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Kiểm tra kích thước ban đầu
    handleResize();

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesData]);

  const handleImageClick = (image: string) => {
    setMainImage(image); // Cập nhật ảnh lớn khi nhấn vào ảnh nhỏ
  };

  const handleFancyboxClick = (image: string) => {
    NativeFancybox.show([
      {
        src: `${BASE_URL}/${image}`,
        type: "image",
        caption: "Your caption here", // Đặt caption trực tiếp tại đây
      },
    ]);
  };

  return (
    <>
      {loading && <ProductDetailLeftSkeleton />}
      {!loading && imagesData && mainImage && (
        <div>
          <div className="imageManify"  onClick={() => handleFancyboxClick(mainImage)}>
          {isMobile ? (
              <img
                src={`${BASE_URL}/${mainImage}`}
                alt="Main Image"
                style={{ width: "100%", cursor: "pointer" }}
              />
            ) : (
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
                  height: 1200,
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
                },
                enlargedImageContainerStyle: {
                  marginLeft: 25,
                  zIndex: 4,
                },
              }}
            />
          )}
          </div>
          <hr />
          <div className="container">
          <ImageSlider images={imagesData} onImageClick={handleImageClick} />
          </div>
        </div>
      )}
    </>
  );
}
