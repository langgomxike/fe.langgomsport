import { Link } from "react-router-dom";
import "./breadcrumb.css"
import Category from "../../../models/Category";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
export type breadcrumbProps = {
  category: Category | undefined,
  onNext: (categoryname : string ,categoryId: any)=> void
}

export default function BreadCrumbContainer({ category, onNext }: breadcrumbProps) {

  // console.log("categories", category);
  //handle
  const handleClickCategories = (id: any) => {
    onNext(`categoryId`, id) 
  }


  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ScreenNameConfig.HOME} >Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={{pathname: ScreenNameConfig.HOME}} state={{category_id: category?.parent.id}}
            // onClick={()=>{handleClickCategories(category?.parent.id)}}
             >{category?.parent.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={{ pathname: ScreenNameConfig.HOME }} state={{category_id: category?.id}}>{category?.name}</Link>
          </li>
        </ol>
      </nav>
      <hr></hr>
    </div>
  )
}