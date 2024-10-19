import { Link } from "react-router-dom";
import "./breadcrumb.css"

export default function BreadCrumbContainer () {
    return (
        <div className="breadcrumb-container">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Giày</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Giày chạy bộ
              </li>
            </ol>
          </nav>
          <hr></hr>
        </div>
    )
}