import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import './index.css';
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import Category from "../../../../models/Category";
import CategoryItem, {CategoryItemProps} from "../CategoryItem";
import ACategory from "../../../../apis/ACategory";
import CategoryInCategories from "../../../../models/CategoryInCategories";
import Skeleton from "react-loading-skeleton";
import CategorySkeleton from "./CategorySkeleton";
import { log } from "console";

type CategoryFilterProps = {
    categoryId: number | null
}

export default function CategoryFilter({categoryId}: CategoryFilterProps) {
    //ref, context
    //state
    const [isActive, setActive] = useState(true)
    const [categories, setCategories] = useState<Array<CategoryInCategories>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number| null>(categoryId);

    //handlers
    const handleIConCategory = () => {
        setActive(!isActive);
    }

    // Hàm nhận giá trị đã chọn từ CategoryItem
    const handleCategorySelect = (id: number | null, name:string) => {
        if (id !== null) {
            setActiveCategory(id);
        } else {
            setActiveCategory(null);
        }
    };


    //effects
    useEffect(() => {
        ACategory.getAllCategories((categories) => {
            setCategories(categories);
        }, setIsLoading)
    },[]);


    const icon = isActive ? <FaAngleUp style={{fontSize: 20}}/> : <FaAngleDown style={{fontSize: 20}}/>

    return (
        <div className="category-container">
            {/* Categories title */}
            <div className="title-block" onClick={handleIConCategory}>
                <h2 className="title">Danh Mục</h2>
                <span className="icon-angle">
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
                                <CategoryItem onCategorySelect={handleCategorySelect} parentCategory={item.categoryParent} categories={item.categories} activeCategory={activeCategory}/>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}