import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./index.css";
import BrandDTO from "../../../../dtos/BrandDTO";
import ABrand from "../../../../apis/ABrand";
import Brand from "../../../../models/Brand";

const FAKE_BRAND = [
  "HOKA",
  "On Running",
  "Saucony",
  "Topo Athletics",
  "Xeroshoes",
  "New Balance",
];

export default function BrandFilter() {
  const [isOpen, setIsOpen] = useState(true); // State để kiểm soát mở/đóng
  const [selectedBrands, setSelectedBrands] = useState<Array<string>>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const togglePanel = () => {
    setIsOpen(!isOpen); // Đảo ngược trạng thái mở/đóng
  };

  const handleFilterByBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      // chua chon thi them vao danh sach
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  useEffect(() => {
    ABrand.getAllBrands((brands) => {
      setBrands(brands);
      console.log(brands);
    })
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
      {isOpen && (
        <div className="filter-content">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="brand-item"
              onClick={() => handleFilterByBrand(brand.name)}
              style={{
                cursor: "pointer",
                fontWeight: selectedBrands.includes(brand.name) ? "bold" : "normal",
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
