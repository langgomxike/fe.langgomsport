import "./policy.css";

export default function PolicyComponent() {
  return (
    <div className="row">
      <div className="col-md-4 col-sm-12 col-lg-4 row">
        <div className="policyImg col-lg-2 col-md-2 col-sm-12 ">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/5163/5163957.png"
            alt=""
          />
        </div>
        <div className="text col-lg-10 col-md-10 col-sm-12">
          <b>MIỄN PHÍ VẬN CHUYỂN (BILL &gt; 1M)</b>
        </div>
      </div>
      <div className=" col-md-4 col-sm-12 col-lg-4 row">
        <div className="policyImg col-lg-2 col-md-2 col-sm-12">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/5465/5465643.png"
            alt=""
          />
       </div>
        <div className="text col-lg-10 col-md-10 col-sm-12">
          <b>ĐỔI TRẢ TRONG VÒNG 7 NGÀY</b>
        </div>
      </div>
      <div className=" col-md-4 col-sm-12 col-lg-4 row">
        <div className="policyImg col-lg-2 col-md-2 col-sm-12">
          <img
            className="img"
            src="https://cdn-icons-png.flaticon.com/128/13068/13068552.png"
            alt=""
          />
        </div>
        <div className="text col-lg-10 col-md-10 col-sm-12">
          <b>SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE</b>
        </div>
      </div>
    </div>
  );
}
