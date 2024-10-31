import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./index.css";
import ABrand from "../../../../apis/ABrand";
import Brand from "../../../../models/Brand";
import BrandSkeleton from "./BrandSkeleton";
import { useLocation, useNavigate } from "react-router-dom";

type BrandFilterProps = {
  selectedBrandIds: number[];
};
export default function BrandFilter({ selectedBrandIds }: BrandFilterProps) {
  // router
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // states
  const [isOpen, setIsOpen] = useState(true); // State để kiểm soát mở/đóng
  const [selectedBrands, setSelectedBrands] =
    useState<number[]>(selectedBrandIds);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const togglePanel = () => {
    setIsOpen(!isOpen); // Đảo ngược trạng thái mở/đóng
  };


  const handleFilterByBrand = (brand: number) => {
    if (selectedBrands.includes(brand)) {
      const newSelectedBrands = selectedBrands.filter((b) => b !== brand);
      setSelectedBrands(newSelectedBrands);

      // Nếu không còn kích thước nào đã chọn, xóa tham số sizes
      if (newSelectedBrands.length === 0) {
        searchParams.delete("brands"); // Xóa tham số sizes
      } else {
        // Nếu vẫn còn kích thước, cập nhật kích thước trong URL
        searchParams.set("brands", newSelectedBrands.join("-")); // Sử dụng dấu gạch ngang
      }

      // Điều hướng tới URL mới
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      // chua chon thi them vao danh sach
      const newSelectedBrands = [...selectedBrands, brand];
      setSelectedBrands(newSelectedBrands);

      // Create or update the URL with selected brands
      searchParams.set("brands", newSelectedBrands.join("-")); // Use comma to separate sizes
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    ABrand.getAllBrands((brands) => {
      setBrands(brands);
    }, setLoading);
  }, []);

  // Effect để đồng bộ hóa selectedBrands với selectedBrandIds
  useEffect(() => {
    setSelectedBrands(selectedBrandIds);
  }, [selectedBrandIds]);

  return (
    <div className="filter-panel">
      <div className="filter-header" onClick={togglePanel}>
        <h3>THƯƠNG HIỆU</h3>
        <span className="toggle-icon" style={{ color: "#1e272e" }}>
          {isOpen ? <FaAngleDown /> : <FaAngleUp />}
        </span>
      </div>
      {loading && <BrandSkeleton />}
      {!loading && isOpen && (
        <div className="filter-content">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="brand-item"
              onClick={() => handleFilterByBrand(brand.id)}
              style={{
                cursor: "pointer",
                fontWeight: selectedBrands.includes(brand.id)
                  ? "bold"
                  : "normal",
              }}
            >
              {brand.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
