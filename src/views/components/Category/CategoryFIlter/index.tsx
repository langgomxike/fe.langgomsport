import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import './index.css';
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import Category from "../../../../models/Category";
import CategoryItem, {CategoryItemProps} from "../CategoryItem";
import ACategory from "../../../../apis/ACategory";
import CategoryDTO from "../../../../dtos/CategoryDTO";
import Skeleton from "react-loading-skeleton";
import CategorySkeleton from "./CategorySkeleton";

type CategoryFilterProps = {
    onFilterChange: (categoryId: number| null) => void
}

export default function CategoryFilter({onFilterChange}: CategoryFilterProps) {
    //ref, context
    //state
    const [isActive, setActive] = useState(true)
    const [categories, setCategories] = useState<Array<CategoryDTO>>([]);
    const [isLoading, setIsLoading] = useState(false);

    //handlers
    const handleIConCategory = () => {
        setActive(!isActive);
        console.log(categories);
    }

    // Hàm nhận giá trị đã chọn từ CategoryItem
    const handleCategorySelect = (id: number | null) => {
        if (id !== null) {
            onFilterChange(id); // Gọi hàm để cập nhật filter
        } else {
            onFilterChange(null); // Gọi với giá trị 0 nếu không có danh mục nào được chọn
        }
    };


    //effects
    useEffect(() => {
        ACategory.getAllCategories((categories) => {
            setCategories(categories);

        })
    },[]);


    const icon = isActive ? <FaAngleUp style={{fontSize: 20}}/> : <FaAngleDown style={{fontSize: 20}}/>

    return (
        <div className="category-container">
            {/* Categories title */}
            <div className="title-block">
                <h2 className="title">Danh Mục</h2>
                <span onClick={handleIConCategory} className="icon-angle">
                    {icon}
                </span>
            </div>
            {/* Categories list */}
            <div className={`filter-box ${isActive ? 'active' : ''}`}>
                {
                    isLoading && <CategorySkeleton/>
                }
                {
                    !isLoading &&
                    <ul>
                        {categories.map((item, index) => (
                            <li key={item.categoryParent.id}>
                                <CategoryItem  onCategorySelect={handleCategorySelect} parentCategory={item.categoryParent} categories={item.categories}/>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}