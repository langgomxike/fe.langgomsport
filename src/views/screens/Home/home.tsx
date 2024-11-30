import FooterComponent from "../../components/Footer/Footer";
import RootLayout from "../../layouts/RootLayout";
import {useEffect, useState} from "react";
import Category from "../../../models/Category";
import CategoryInCategories from "../../../models/CategoryInCategories";
import ACategory from "../../../apis/ACategory";
import "./home.css";
import {Container} from "react-bootstrap";
import {ChevronDown} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

export default function Home() {

  //states
  const [categories, setCategories] = useState<CategoryInCategories[]>([]);

  //handlers

  //effects
  useEffect(() => {
    ACategory.getAllCategories(categories => {
      setCategories(categories);
    }, () => {

    });
  }, []);


  return (
    <RootLayout>
      <Container>
        <div className={"home-category-list"}>
          {categories.map(category => (
            <div key={category.categoryParent.id} className={"home-category-list-item"}>

              <Link className={"home-category-list-item-name"}
                    to={"/products?category_id=" + category.categoryParent.id}>
                {category.categoryParent.name}
              </Link>

              {category.categories.length > 0 && (
                <>
                  <ChevronDown className={"ms-1"}/>

                  <div className={"home-category-list-in-category"}>
                    {category.categories.map(categoryInList => (
                      <div key={categoryInList.id} className={"home-category-list-in-category-item"}>
                        <Link className={"home-category-list-item-name"} to={"/products?category_id=" + categoryInList.id}>
                          {categoryInList.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </RootLayout>
  )
}