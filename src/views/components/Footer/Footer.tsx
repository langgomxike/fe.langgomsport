import { Nav, Navbar, Container } from "react-bootstrap";
import "./footer.css";
import { useContext } from "react";
import LanguageContext from "../../../configs/LanguageConfig";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

export default function FooterComponent() {
  // context
  const languageContext = useContext(LanguageContext);

  return (
    <div className="ctn footer">
      <div className=" container">
        <div className="row py-4">
          <div className=" padingbot col-md-3 col-sm-12 col-lg-3 ">
            <div className="">
              <h3>{languageContext.language.ABOUT_US}</h3>
            </div>
            <hr />
            <p style={{ textAlign: "justify" }}>
              {languageContext.language.ABOUT_US_DESCRIPTION}
            </p>
          </div>

          <div className="padingbot col-md-6 col-sm-12 col-lg-6 ">
            <div className="">
              <h3>{languageContext.language.STORE_SYSTEM}</h3>
            </div>

            <hr />
            <ul className="list-unstyled">
              <li className="py-2">
                <b>LanggomSport Quận 1:</b>
                <div className="footer-item">
                  <IoLocationOutline />
                  <span>
                  123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                  </span>
                </div>
                <div className="footer-item">
                  <IoCallOutline />
                  <span>0901 234 567</span>
                </div>
              </li>
              <li className="py-2">
                <b>LanggomSport Quận 3:</b>
                <div className="footer-item">
                  <IoLocationOutline />
                  <span>
                    456 Đường Võ Văn Tần, Phường 5, Quận 3, TP. Hồ Chí Minh
                  </span>
                </div>
                <div className="footer-item">
                  <IoCallOutline />
                  <span>0902 345 678</span>
                </div>
              </li>
              <li className="py-2">
                <b>LanggomSport Hà Nội:</b>
                <div className="footer-item">
                  <IoLocationOutline />
                  <span>
                    789 Đường Kim Mã, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội
                  </span>
                </div>
                <div className="footer-item">
                  <IoCallOutline />
                  <span>0903 456 789</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="padingbot col-md-3 col-sm-12 col-lg-3">
            <div className="">
              <h3>{languageContext.language.CUSTOMER_SUPPORT}</h3>
            </div>
            <hr />
            <ul className="list-unstyled">
              <li className="py-2">
                <b>Email:</b> langgomSport@gmail.com
              </li>
              <li className="py-2">
                <b>Hotline 1:</b> 0987654321
              </li>
              <li className="py-2">
                <b>Hotline 2:</b> 0987654212
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
