import "./style.css";
import Category from "../../../../models/Category";
import { FaAngleDown, FaCaretDown, FaCaretRight } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScreenNameConfig from "../../../../configs/ScreenNameConfig";
import { log } from "console";
import LanguageContext from "../../../../configs/LanguageConfig";
import ConfigValue from "../../../../configs/ConfigValue";

export type CategoryItemProps = {
  parentCategory: Category;
  categories: Array<Category>;
  onCategorySelect: (id: number | null, parentId: number | null) => void;
  activeCategory: number | null;
  activeParentCategory: number | null;
  route?: string;
  onAfterClick?: () => void;
};

export default function CategoryItem({
  parentCategory,
  categories,
  onCategorySelect,
  activeCategory,
  activeParentCategory,
  route,
  onAfterClick
}: CategoryItemProps) {
  //ref, context
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const language = useContext(LanguageContext).language

  //state
  // Để lưu id của mục con được chọn
  const [active, setActive] = useState<number | null>(activeCategory);
  // Để lưu id của mục cha được chọn
  const [activeParent, setActiveParent] = useState<number | null>(activeParentCategory);
  const [activeChild, setActiveChild] = useState<number | null>(null);

  //handlers
  const handleIconCategory = (categoryId:number) => {
    setActiveChild(activeChild === categoryId ? null : categoryId);
    setActive(active === activeCategory? activeCategory : null)
  };

  const handleOnClickCategory = (id: number, name: string) => {
    setActive(id);
    onCategorySelect(id, parentCategory.id);
    // Cập nhật `page` vào URL
    searchParams.set("category_id", id.toString());
    navigate(`${ConfigValue.PRODUCT_CATEGORY_ROUTE}?${searchParams.toString()}`);
    onAfterClick && onAfterClick();
  };


  useEffect(() => {
    setActive(activeCategory);
    setActiveParent(activeParentCategory);
  }, [activeCategory, activeParentCategory])
  
  return (
    <div className="category-block">
      <div className="title-block">
        <span className={`list-icon list-icon-parent ${
            activeParent === parentCategory.id ? "active" : ""
          }`}> <FaCaretRight style={{ fontSize: 15 }} /></span>

        <div
         onClick={() => handleOnClickCategory(parentCategory.id, parentCategory.name)}
          className={`title-item ${
            activeParent === parentCategory.id ? "active" : activeChild === parentCategory.id ? "active-child" : ""
          }`}
        > {language.TYPE === "VI"?  parentCategory.name : parentCategory.enName} </div>

        <span className="icon-angle-item" onClick={() => {handleIconCategory(parentCategory.id)}}>
          <FaAngleDown style={{ fontSize: 12 }} />
        </span>
      </div>
      <div className={`filter-box child ${activeParent === parentCategory.id || activeChild === parentCategory.id  ? "active" : ""}`}>
        <ul>
          {categories.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => handleOnClickCategory(item.id, item.name)}
                className="item"
              >
                <span className="list-icon item">
                  <FaCaretRight />
                </span>

                <div
                  className={`item-category ${
                    active === item.id ? "active" : ""
                  }`}

                > {language.TYPE === "VI"?  item.name : item.enName } </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
