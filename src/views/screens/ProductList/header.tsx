import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ACategory from "../../../apis/ACategory";
import Category from "../../../models/Category";
import Skeleton from "react-loading-skeleton";
import LanguageContext from "../../../configs/LanguageConfig";

type HeaderProductListProps = {
  productQuantity: number;
  onFilterChange: (sort: string) => void;
  setPageFirst: (page: number) => void;
};

export default function HeaderProductList({
  productQuantity,
  onFilterChange,
  setPageFirst,
}: HeaderProductListProps) {
  const language = useContext(LanguageContext).language
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
      <div className="product-list-container-title">
        <div className="titleProducts">
              <h1>{(language.TYPE === "VI" ? category?.name : category?.enName) ?? language.ALL}</h1>
              <span>({productQuantity} <span style={{textTransform: "lowercase"}}>{language.PRODUCT}</span>)</span>
        </div>
        <select
          className="form-select select-container"
          onChange={handleSortChange}
          value={sort}
          aria-label={language.SORT_BY}
        >
          <option value="" disabled>
            {language.SORT_BY}
          </option>
          <option value="priceasc">{language.PRICE_ASC}</option>
          <option value="pricedesc">{language.PRICE_DESC}</option>
          <option value="discount">{language.DISCOUNT}</option>
        </select>
      </div>
    </>
  );
}
