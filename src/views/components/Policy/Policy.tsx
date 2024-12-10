import { useContext } from "react";
import "./policy.css";
import LanguageContext from "../../../configs/LanguageConfig";

export default function PolicyComponent() {
  const language = useContext(LanguageContext).language;
  return (
    <div className="policy-component">
      <div className="policy-item">
        <div className="policyImg">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/5163/5163957.png"
            alt=""
          />
        </div>
        <div className="text">
          <b>{language.FREE_SHIPPING}</b>
        </div>
      </div>
      <div className="policy-item">
        <div className="policyImg">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/5465/5465643.png"
            alt=""
          />
       </div>
        <div className="text">
          <b>{language.RETURN_POLICY}</b>
        </div>
      </div>
      <div className="policy-item">
        <div className="policyImg">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/13068/13068552.png"
            alt=""
          />
        </div>
        <div className="text">
        <b>{language.IN_STORE_EXPERIENCE}</b>
        </div>
      </div>
    </div>
  );
}
