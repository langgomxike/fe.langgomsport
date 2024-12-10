import { Link } from "react-router-dom";
import "./breadcrumb.css"
import Category from "../../../models/Category";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
import { useContext } from "react";
import LanguageContext from "../../../configs/LanguageConfig";
import ConfigValue from "../../../configs/ConfigValue";
export type breadcrumbProps = {
  category: Category | undefined,
  onNext: (categoryname : string ,categoryId: any)=> void
}

export default function BreadCrumbContainer({ category, onNext }: breadcrumbProps) {
  const language = useContext(LanguageContext).language
  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ScreenNameConfig.HOME}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={{
              pathname: ScreenNameConfig.PRODUCTS,
              search: `?category_id=${category?.parent.id}`,}}
              state={{category_name: category?.parent.name}}
             >{language.TYPE === ConfigValue.TYPE_VI ?  category?.parent.name : category?.parent.enName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={{ 
              pathname: ScreenNameConfig.PRODUCTS, 
              search: `?category_id=${category?.id}`}}
              state={{category_name: category?.name}}
              >{language.TYPE === ConfigValue.TYPE_VI ? category?.name: category?.enName}</Link>
          </li>
        </ol>
      </nav>
      <hr></hr>
    </div>
  )
}