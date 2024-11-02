import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

export default function ProductDetailLeftSkeleton() {
  const isMobile = window.innerWidth < 768;
  const skeletonHeight = isMobile ? "400px" : "500px"; //
    return (
        <div>
            <Skeleton height={skeletonHeight}/>
            <div className="d-flex gap-3 mt-3 mb-5">
                <Skeleton width={100} height={100}/>
                <Skeleton width={100} height={100}/>
                <Skeleton width={100} height={100}/>
                {
                  !isMobile && 
                  <Skeleton width={100} height={100}/>
                }
            </div>
        </div>
    )
}