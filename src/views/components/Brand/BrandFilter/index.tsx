import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./index.css";
import ABrand from "../../../../apis/ABrand";
import Brand from "../../../../models/Brand";
import BrandSkeleton from "./BrandSkeleton";

type BrandFilterProps = {
  onFilterChange: (brandIds:number[]) => void
}
export default function BrandFilter({onFilterChange}:BrandFilterProps) {
  const [isOpen, setIsOpen] = useState(true); // State để kiểm soát mở/đóng
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const togglePanel = () => {
    setIsOpen(!isOpen); // Đảo ngược trạng thái mở/đóng
  };
  const [loading, setLoading] = useState(true);

  const handleFilterByBrand = (brand: number) => {
    if (selectedBrands.includes(brand)) {
      const newSelectedBrands = selectedBrands.filter((b) => b !== brand)
      setSelectedBrands(newSelectedBrands);
      onFilterChange(newSelectedBrands);
    } else {
      // chua chon thi them vao danh sach
      const newSelectedBrands = [...selectedBrands, brand]
      setSelectedBrands(newSelectedBrands);
      onFilterChange(newSelectedBrands);
    }
  };


  useEffect(() => {
    ABrand.getAllBrands((brands) => {
      setBrands(brands);
    }, setLoading)
  }, []);

  return (
    <div className="filter-panel">
      <div className="filter-header" onClick={togglePanel}>
        <h3>THƯƠNG HIỆU</h3>
        <span className="toggle-icon" style={{ color: "#1e272e" }}>
          {isOpen ? (
            <FaAngleDown/>
          ) : (
            <FaAngleUp/>
          )}
        </span>
      </div>
      {loading &&
          <BrandSkeleton/>
      }
      { !loading && isOpen && (
        <div className="filter-content">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="brand-item"
              onClick={() => handleFilterByBrand(brand.id)}
              style={{
                cursor: "pointer",
                fontWeight: selectedBrands.includes(brand.id) ? "bold" : "normal",
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
