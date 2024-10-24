
import Skeleton from "react-loading-skeleton";

const skeletonCount=  5;

export default function () {

  // render
  return (
    <div>
      <Skeleton height={"70px"}/>

      <Skeleton height={"30px"}/>

      <hr />
      {/* Product price */}
      <Skeleton height={"50px"}/>

      {/* Product sizes */}
      <div className="detail-product-size">
        <span className="size-title">Kích thước</span>
        <div style={{display: "flex", gap:"10px"}}>
            {Array.from({length: skeletonCount}).map((_, index) => (
                <Skeleton key={index} width={"60px"} height="34px"/>
            ))}
        </div>
      </div>
    </div>
  );
}
