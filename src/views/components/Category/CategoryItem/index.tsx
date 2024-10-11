import "./style.css";
import Category from "../../../../models/Category";
import { useState } from "react";
import { FaAngleDown, FaCaretDown, FaCaretRight } from "react-icons/fa6";

export type CategoryItemProps = {
  parentCategory: Category;
  categories: Array<Category>;
};

export default function CategoryItem({
  parentCategory,
  categories,
}: CategoryItemProps) {
  //ref, context

  //state
  const [isActive, setActive] = useState(false);

  //handlers
  const handleIConCategory = () => {
    setActive(!isActive);
  };
  //effects
  const handleOnClickCateory = (id: number) => {
    console.log(id);
  };

  const icon = isActive ? <FaCaretDown /> : <FaCaretRight />;

  return (
    <div className="category-block">
      <div className="title-block item">
        <span className="list-icon">{icon}</span>
        <h5 className="title-item">{parentCategory.name}</h5>
        <span onClick={handleIConCategory} className="icon-angle-item">
          <FaAngleDown />
        </span>
      </div>
      <div className={`filter-box child ${isActive ? "active" : ""}`}>
        <ul>
          {categories.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  handleOnClickCateory(item.id);
                }}
                key={item.id}
                className="item"
              >
                <span className="list-icon item">
                  <FaCaretRight />
                </span>
                <div className="item-category">{item.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
