import "./style.css";
import Category from "../../../../models/Category";
import { FaAngleDown, FaCaretDown, FaCaretRight } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenNameConfig from "../../../../configs/ScreenNameConfig";

export type CategoryItemProps = {
  parentCategory: Category;
  categories: Array<Category>;
  onCategorySelect: (id: number | null, name: string) => void; // Hàm để gửi ID về component cha
  activeCategory: number | null;
};

export default function CategoryItem({
  parentCategory,
  categories,
  onCategorySelect,
  activeCategory,
}: CategoryItemProps) {
  //ref, context

  //state
  const [active, setActive] = useState<number | null>(activeCategory); // Để lưu id của mục con được chọn
  const [activeParent, setActiveParent] = useState<number | null>(activeCategory); // Để lưu id của mục cha được chọn
  //handlers
  const handleIconCategory = (categoryId:number) => {
    setActiveParent(activeParent === categoryId ? null : categoryId);
    setActive(active === activeCategory? activeCategory : null)

  };

  useEffect(() => {
    console.log("Active category: " + activeCategory);
    
  }, [activeCategory])

  const handleOnClickCategory = (id: number, name: string) => {
    setActive(id);
    onCategorySelect(id, name);
  };
  

  const icon =
    active !== null ? (
      <FaCaretDown style={{ fontSize: 15 }} />
    ) : (
      <FaCaretRight style={{ fontSize: 15 }} />
    );

  return (
    <div className="category-block">
      <div className="title-block" onClick={() => {handleIconCategory(parentCategory.id)
      }}>
        <span className={`list-icon list-icon-parent ${
            activeParent === parentCategory.id ? "active" : ""
          }`}> <FaCaretRight style={{ fontSize: 15 }} /></span>

        <Link
         onClick={() => handleOnClickCategory(parentCategory.id, parentCategory.name)}
          className={`title-item ${
            activeParent === parentCategory.id ? "active" : ""
          }`}
          to={{
            pathname: ScreenNameConfig.PRODUCTS,
            search: `?category_id=${parentCategory.id}`,
          }}
          state={{category_name: parentCategory.name }}
        > {parentCategory.name} </Link>

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
                <Link
                  className={`item-category ${
                    active === item.id ? "active" : ""
                  }`}
                  to={{
                    pathname: ScreenNameConfig.PRODUCTS,
                    search: `?category_id=${item.id}`,
                  }}
                  state={{category_name: item.name }}
                > {item.name} </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
