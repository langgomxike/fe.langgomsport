import "./style.css";
import Category from "../../../../models/Category";
import { FaAngleDown, FaCaretDown, FaCaretRight } from "react-icons/fa6";
import React, { useState } from "react";

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
  activeCategory
}: CategoryItemProps) {
  //ref, context

  //state
  const [active, setActive] = useState<number | null>(activeCategory); // Để lưu id của mục con được chọn

  //handlers
  const handleIconCategory = () => {
    setActive(active === null ? -1 : null); // Toggle trạng thái mở/đóng toàn bộ
  };

  const handleOnClickCategory = (id: number, name: string) => {    
    setActive(id);
    onCategorySelect(id, name);
  };


  const icon =
    activeCategory !== null ? (
      <FaCaretDown style={{ fontSize: 15 }} />
    ) : (
      <FaCaretRight style={{ fontSize: 15 }} />
    );

  return (
    <div className="category-block">
      <div className="title-block item">
        <span className="list-icon">{icon}</span>
        <h5
          className="title-item"
          onClick={() =>
            handleOnClickCategory(parentCategory.id, parentCategory.name)
          }
        >
          {parentCategory.name}
        </h5>
        <span onClick={handleIconCategory} className="icon-angle-item">
          <FaAngleDown style={{ fontSize: 12 }} />
        </span>
      </div>
      <div
        className={`filter-box child ${
          active !== null ? "active" : ""
        }`}
      >
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
                    activeCategory === item.id ? "active" : ""
                  }`}
                >
                  {item.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
