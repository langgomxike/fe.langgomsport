import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

export default function CartItem() {
  const isMobile = useMediaQuery({ maxWidth: 992 }); // Kiểm tra màn hình nhỏ hơn 768px (di động)

  return (
    <>
      <tr className="item-cart">
        {/* Product image */}
        <td>
          <div className="cart-item-image">
            <img
              src="https://pos.nvncdn.com/be3294-43017/ps/20231208_7LnI3iZkJX.jpeg"
              alt="Product"
            />
          </div>
        </td>

        {/* Product name, price */}
        {!isMobile ? (
          <>
            {/* Product name, price on destop */}
            <td width={"33%"}>
            <h3>
              <Link to="#" className="cart-item-name">
                Clifton 9 Wide | Giày Chạy Bộ Nam Hoka Clifton 9 Wide - DLL - 44
                2/3
              </Link>
              </h3>
            </td>
            <td>
              <div className="text-center">
                <span className="cart-item-price">2,239,300 VNĐ</span>
              </div>
            </td>
          </>
        ) : (
          <>
            {/* Product name, price on mobile */}
            <td>
              <h3>
                <Link to="#" className="cart-item-name">
                  Clifton 9 Wide | Giày Chạy Bộ Nam Hoka Clifton 9 Wide - DLL -
                  44 2/3
                </Link>
              </h3>
              <div>
                <span className="cart-item-price-total-title">Giá: </span>
                <span className="cart-item-price-total">2,239,300 VNĐ</span>
              </div>
            </td>
          </>
        )}

        {/* Input quatity and delete button */}
        {!isMobile ? (
          <>
            {/* Input quantity on desktop */}
            <td>
              <div className="item-cart-input-quantity">
                <input
                  type="number"
                  value={1}
                  min={1}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
            </td>

            {/* Total price on desktop */}
            <td>
              <div className="text-center">
                <span className="cart-item-price">2,239</span>
              </div>
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
  );
}
