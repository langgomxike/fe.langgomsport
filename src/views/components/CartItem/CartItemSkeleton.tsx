import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

type CartItemSkeletonProps = {
    limit: number;
};

export default function CartItemSkeleton({ limit }: CartItemSkeletonProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
        {
            Array.from({ length: limit }).map(
                (_, index) => (
                 <>
                     <tr className="item-cart">
          {/* Product image */}
          <td>
          <Skeleton height={150}/>
          </td>
  
          {/* Product name, price */}
          {!isMobile ? (
            <>
              {/* Product name, price on destop */}
              <td width={"33%"}>
              <Skeleton height={70}/>
              </td>
              <td>
              <Skeleton height={50}/>
              </td>
            </>
          ) : (
            <>
              {/* Product name, price on mobile */}
              <td>
              <Skeleton height={100}/>
              </td>
            </>
          )}
  
          {/* Input quatity and delete button */}
          {!isMobile ? (
            <>
              {/* Input quantity on desktop */}
              <td>
              <Skeleton height={50}/>
              </td>
  
              {/* Total price on desktop */}
              <td>
              <Skeleton height={50}/>
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
              <div className="item-cart-input-quantity">
                <input
                  type="number"
                  value={1}
                  min={1}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
              {/* Button delete on moblie */}
              <div className="btn-delete mt-2">
                <FiTrash2 className="btn-delete-icon" />
              </div>
            </td>
          )}
        </tr>
                 </>
                )
              )
        }
       
      </>
    );
}
