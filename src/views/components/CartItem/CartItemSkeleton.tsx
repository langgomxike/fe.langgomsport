import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

type CartItemSkeletonProps = {
  limit: number;
};

export default function CartItemSkeleton({ limit }: CartItemSkeletonProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {Array.from({ length: limit }).map((_, index) => (
          <tr className="item-cart" key={index}>

            {/* Product name, price */}
            {!isMobile ? (
              <>
                {/* Product image */}
                <td>
                  <Skeleton height={150} />
                </td>
                {/* Product name, price on destop */}
                <td width={"33%"}>
                  <Skeleton height={70} />
                </td>
                <td>
                  <Skeleton height={50} />
                </td>
              </>
            ) : (
              <>
               {/* Product image */}
               <td>
                  <Skeleton height={100} />
                </td>
                {/* Product name, price on mobile */}
                <td>
                  <Skeleton height={80} />
                </td>
              </>
            )}

            {/* Input quatity and delete button */}
            {!isMobile ? (
              <>
                {/* Input quantity on desktop */}
                <td>
                  <Skeleton height={50} />
                </td>

                {/* Total price on desktop */}
                <td>
                  <Skeleton height={50} />
                </td>

                {/* Button delete on desktop */}
                <td>
                  <div className="btn-delete">
                    <FiTrash2 className="btn-delete-icon" />
                  </div>
                </td>
              </>
            ) : (
              <td>
                {/* Input quantity on moblie */}
                <Skeleton height={50} />
                {/* Button delete on moblie */}
                {/* <div className="btn-delete mt-2">
                  <FiTrash2 className="btn-delete-icon" />
                </div> */}
              </td>
            )}
          </tr>
      ))}
    </>
  );
}
