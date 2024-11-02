import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ACategory from "../../../apis/ACategory";
import Category from "../../../models/Category";
import Skeleton from "react-loading-skeleton";

type HeaderProductListProps = {
  productQuantity: number;
  categoryName: string;
  onFilterChange: (sort: string) => void;
  setPageFirst: (page: number) => void;
};

export default function HeaderProductList({
  productQuantity,
  categoryName,
  onFilterChange,
  setPageFirst,
}: HeaderProductListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setPageFirst(1);
    onFilterChange(sortValue);

    searchParams.set("sort", sortValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    // Cập nhật state khi URL thay đổi
    const currentSort = searchParams.get("sort");
    const idFromUrl = searchParams.get("category_id");
    if (currentSort) {
      setSort(currentSort);
    }
    if (idFromUrl) setCategoryId(parseInt(idFromUrl, 10));
  }, [location.search]);

  useEffect(() => {
    if (categoryId) {
      console.log("id", categoryId);
      ACategory.getCategoryById(
        categoryId ?? 1,
        (data) => {
          setCategory(data);
        },
        setLoading
      );
    }
  }, [categoryId]);

  return (
    <>
     {loading && (
      <div>
        <Skeleton height={30 + "px"} />
      </div>
     )}
      <div className="product-list-container-title">
        <div className="titleProducts">
          {!loading && (
            <>
              <h1>{category?.name}</h1>
              <span>({productQuantity} sản phẩm)</span>
            </>
          )}
        </div>
        <select
          className="form-select select-container"
          onChange={handleSortChange}
          defaultValue=""
          value={sort}
          aria-label="-- Sắp xếp theo --"
        >
          <option value="" disabled>
            -- Sắp xếp theo --
          </option>
          <option value="priceasc">Giá tăng dần</option>
          <option value="pricedesc">Giá giảm dần</option>
          <option value="discount">Mức giảm giá</option>
        </select>
      </div>
    </>
  );
}
