import React, { useContext, useEffect, useState } from "react";
import "./sizeFilter.css";
import ASize from "../../../apis/ASize";
import Size from "../../../models/Size";
import SizeSkeleton from "./SizeSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageContext from "../../../configs/LanguageConfig";

type SizeFilterProps = {
  categoryId: number | undefined;
  selectedSizeIds: number[];
};

export default function ({ categoryId, selectedSizeIds }: SizeFilterProps) {
  // location
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const language = useContext(LanguageContext).language;

  // state
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Hàm xử lý khi chọn nhiều size
  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      const newSelectedSizes = selectedSizes.filter((s) => s !== size);
      setSelectedSizes(newSelectedSizes);

      // Nếu không còn kích thước nào đã chọn, xóa tham số sizes
      if (newSelectedSizes.length === 0) {
        searchParams.delete("sizes"); // Xóa tham số sizes
      } else {
        // Nếu vẫn còn kích thước, cập nhật kích thước trong URL
        searchParams.set("sizes", newSelectedSizes.join("-")); // Sử dụng dấu gạch ngang
      }

      // Điều hướng tới URL mới
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      const newSelectedSizes = [...selectedSizes, size];
      setSelectedSizes(newSelectedSizes);

      // Create or update the URL with selected sizes
      searchParams.set("sizes", newSelectedSizes.join("-")); // Use comma to separate sizes
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  // effect
  useEffect(() => {
    const fetchSizes = () => {
      // Gọi phương thức getSizesByCategory với categoryId
      ASize.getSizesByCategory(
        categoryId ?? 1,
        (data: Size[]) => {
          setSizes(data);
        },
        setLoading
      );
    };

    // Chỉ gọi fetchSizes nếu categoryId có giá trị hợp lệ
    if (categoryId) {
      fetchSizes();
    }
  }, [categoryId]); // Chạy lại khi categoryId thay đổi

  // Effect để đồng bộ hóa selectedSizes với selectedSizeIds
  useEffect(() => {
    setSelectedSizes(selectedSizeIds);
  }, [selectedSizeIds]);

  //render

  return (
    <div className="size-filter-container">
      <h3 className="size-filter-title">{language.SIZE}</h3>
      {loading && <SizeSkeleton />}
      {!loading && (
        <div className="size-block">
          {sizes.map((item) => (
            <div
              key={item.id}
              className={`size-item ${
                selectedSizes.includes(item.id) ? "active" : ""
              }`}
              onClick={() => toggleSize(item.id)}
            >
              <span>{item.size}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
