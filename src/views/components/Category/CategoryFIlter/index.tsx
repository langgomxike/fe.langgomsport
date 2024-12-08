import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./index.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Category from "../../../../models/Category";
import ACategory from "../../../../apis/ACategory";
import CategoryInCategories from "../../../../models/CategoryInCategories";
import Skeleton from "react-loading-skeleton";
import CategorySkeleton from "./CategorySkeleton";
import { log } from "console";
import CategoryItem from "../CategoryItem";

type CategoryFilterProps = {
  categoryId: number | null;
  route?: string;
  onAfterClick? : () => void;
};

export default function CategoryFilter({ categoryId , route, onAfterClick}: CategoryFilterProps) {
  //ref, context
  //state
  const [isActive, setActive] = useState(true); // Trạng thái hiển thị toàn bộ danh mục
  const [categories, setCategories] = useState<Array<CategoryInCategories>>([]); // Danh sách danh mục từ API

  const [activeCategory, setActiveCategory] = useState<number | null>(
    categoryId
  ); // ID của danh mục "active"
  const [activeParentCategory, setActiveParentCategory] = useState<
    number | null
  >(null); // ID của danh mục cha "active"

  const [isLoading, setIsLoading] = useState(false);

  //handlers
  // Toggle hiển thị toàn bộ danh mục
  const handleIConCategory = () => {
    setActive(!isActive);
  };

  // Hàm xử lý khi chọn một danh mục
  const handleCategorySelect = (id: number | null, parentId: number | null) => {
      setActiveCategory(id); // Đặt danh mục con là "active"
      setActiveParentCategory(parentId); // Đặt danh mục cha là "active"
  };

  //effects
  // Lấy danh sách danh mục từ API khi component mount
  useEffect(() => {
    ACategory.getAllCategories((categories) => {
      setCategories(categories);
    }, setIsLoading);
  }, []);

  // Xác định danh mục cha và con "active" khi component mount hoặc khi categoryId thay đổi
  useEffect(() => {    
    if (categoryId && categories.length > 0) {
      let foundCategory = null;
      let foundParentCategory = null;

      for (const item of categories) {
        // Kiểm tra nếu categoryId là id của danh mục cha
        if (item.categoryParent.id === categoryId) {
            foundParentCategory = item.categoryParent;
            foundCategory = null; // Đặt null vì nó là danh mục cha
            break;
        }

        // Nếu không, tìm trong danh mục con
        foundCategory = item.categories.find((cat) => cat.id === categoryId);
        if (foundCategory) {
            foundParentCategory = item.categoryParent;
            break;
        }
    }

      // Cập nhật trạng thái dựa trên kết quả tìm kiếm
      if (foundParentCategory) {
        setActiveParentCategory(foundParentCategory.id);
        setActiveCategory(foundCategory ? foundCategory.id : null);
    } else {
        setActiveCategory(null);
        setActiveParentCategory(null);
    }
    }
  }, [categoryId, categories]);

  const icon = isActive ? (
    <FaAngleUp style={{ fontSize: 20 }} />
  ) : (
    <FaAngleDown style={{ fontSize: 20 }} />
  );

  return (
    <div className="category-container">
      {/* Categories title */}
      <div className="title-block" onClick={handleIConCategory}>
        <h2 className="title">Danh Mục</h2>
        <span className="icon-angle">{icon}</span>
      </div>
      {/* Categories list */}
      <div className={`filter-box ${isActive ? "active" : ""}`}>
        {isLoading && <CategorySkeleton />}
        {!isLoading && (
          <ul>
            {categories.map((item, index) => (
              <li key={item.categoryParent.id}>
                <CategoryItem
                  parentCategory={item.categoryParent}
                  categories={item.categories}
                  activeCategory={activeCategory}
                  activeParentCategory={activeParentCategory}
                  onCategorySelect={handleCategorySelect}
                  route={route}
                  onAfterClick={onAfterClick}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
