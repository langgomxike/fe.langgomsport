import "./policy.css";

export default function PolicyComponent() {
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
          <b>MIỄN PHÍ VẬN CHUYỂN (BILL &gt; 1M)</b>
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
          <b>ĐỔI TRẢ TRONG VÒNG 7 NGÀY</b>
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
          <b>SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE</b>
        </div>
      </div>
    </div>
  );
}
