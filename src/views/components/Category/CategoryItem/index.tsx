import "./style.css";
import Category from "../../../../models/Category";
import {FaAngleDown, FaCaretRight} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import SLog, {LogType} from "../../../../services/SLog";

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

  //state
  const [active, setActive] = useState<number | null>(activeCategory); // Để lưu id của mục con được chọn
  const [activeParent, setActiveParent] = useState<number | null>(activeParentCategory); // Để lưu id của mục cha được chọn

  //handlers
  const handleIconCategory = (categoryId:number) => {
    setActiveParent(activeParent === categoryId ? null : categoryId);
    setActive(active === activeCategory? activeCategory : null)
  };

  const handleOnClickCategory = (id: number, name: string) => {
    setActive(id);
    onCategorySelect(id, parentCategory.id);
    // Cập nhật `page` vào URL
    searchParams.set("category_id", id.toString());
    navigate(`${location.pathname}${route && !location.pathname.includes(route) ? route : ""}?${searchParams.toString()}`);
    onAfterClick && onAfterClick();
  };


  useEffect(() => {
    setActive(activeCategory);
    setActiveParent(activeParentCategory);
  }, [activeCategory, activeParentCategory])
  
  return (
    <div className="category-block">
      <div className="title-block" onClick={() => {handleIconCategory(parentCategory.id)
      }}>
        <span className={`list-icon list-icon-parent ${
            activeParent === parentCategory.id ? "active" : ""
          }`}> <FaCaretRight style={{ fontSize: 15 }} /></span>

        <div
         onClick={() => handleOnClickCategory(parentCategory.id, parentCategory.name)}
          className={`title-item ${
            activeParent === parentCategory.id ? "active" : ""
          }`}
        > {parentCategory.name} </div>

        <span className="icon-angle-item">
          <FaAngleDown style={{ fontSize: 12 }} />
        </span>
      </div>
      <div className={`filter-box child ${activeParent === parentCategory.id ? "active" : ""}`}>
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

                > {item.name} </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
