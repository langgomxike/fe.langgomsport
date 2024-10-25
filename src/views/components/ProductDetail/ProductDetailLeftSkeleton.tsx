import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

export default function ProductDetailLeftSkeleton() {
    const settings = {
        // trên máy tính
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
          {
            // trên mobile
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      };

    return (
        <div>
            <Skeleton width={500} height={500}/>
             <Slider {...settings}>
                <Skeleton width={100} height={100}/>
                <Skeleton width={100} height={100}/>
                <Skeleton width={100} height={100}/>
                <Skeleton width={100} height={100}/>
            </Slider>
        </div>
    )
}