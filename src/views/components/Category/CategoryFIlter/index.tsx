import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import './index.css';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Category from "../../../../models/Category";
import CategoryItem, { CategoryItemProps } from "../CategoryItem";
import ACategory from "../../../../apis/ACategory";
import CategoryDTO from "../../../../dtos/CategoryDTO";

const demo: Array<CategoryItemProps> = [
    {
        parentCategory : new Category(1, "do nam"),
        categories: [
            new Category(4, "Ao Nam", 1),
            new Category(5, "Quan Nam", 1),
            new Category(6, "Giay Nam", 1),
            new Category(7, "balo Nam", 1),
        ]
    },
    {
        parentCategory : new Category(2, "do nu"),
        categories: [
            new Category(8, "Ao nu", 2),
            new Category(9, "Quan nu", 2),
            new Category(10, "Giay nu", 2),
            new Category(11, "balo nu", 2),
        ]
    },
    {
        parentCategory :new Category(3, " Phu Kien"),
        categories: [
            new Category(12, "Gay", 3),
            new Category(13, "Non", 3),
            new Category(14, "gel dinh duong", 3),
        ]
    }
] 

export default function CategoryFilter() {
    //ref, context
    //state
    const [isActive, setActive] = useState(false)
    const [categories, setCategories] = useState<Array<CategoryDTO>>([]);
    
    //handlers
    const handleIConCategory = () => {
        setActive(!isActive);
        console.log(categories);
    }
    //effects
    useEffect(()=> {
        ACategory.getAllCategories((categories)=> {
            setCategories(categories);
            
        })
    })

    const icon = isActive ? <FaAngleUp/> : <FaAngleDown/>
    return (
        <Container>
            {/* Categories title */}
            <div className="title-block">
                <h2 className="title">Danh Mục</h2>
                <span onClick={handleIConCategory} className="icon-angle">
                    {icon}
                </span>
            </div>
            {/* Categories list */}
            <div className={`filter-box ${isActive ? 'active' : ''}`}>
                <ul>
                    {categories.map((item, index) => (
                        <li key={item.categoryParent.id}>
                            <CategoryItem parentCategory={item.categoryParent} categories={item.categories}/>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
        </Container>
    )
}