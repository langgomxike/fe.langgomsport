import { Nav, Navbar, Container } from "react-bootstrap";
import "./footer.css";

export default function FooterComponent() {
  return (
    <div className="ctn">
    <div className=" container">
      
      <div className="row py-4">
        <div className=" padingbot col-md-3 col-sm-12 col-lg-3 ">
          <div className="">
            <h3>Giới thiệu</h3>
          </div>
          <hr />
          <p style={{textAlign: "justify"}}>
          Langgomsport chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình chính hãng đến từ các thương hiệu hàng đầu thế giới. Chúng tôi luôn có sẵn những dòng sản phẩm mới nhất, tối ưu và hiệu suất cao dành cho runners. Đội ngũ nhân viên trẻ trung, nhiệt huyết, là những chân chạy đã được tích luỹ nhiều kinh nghiệm tập luyện và thi đấu sẽ mang đến tinh thần phục vụ chuyên nghiệp và chuyên sâu nhất cho khách hàng.
          </p>
        </div>

        <div className="padingbot col-md-6 col-sm-12 col-lg-6 ">
          <div className="">
            <h3>Hệ thống cửa hàng</h3>
          </div>

          <hr />
          <ul className="list-unstyled">
            <li className="py-2">
              <b>LanggomSport Quận 1:</b>
              <br />
              Địa chỉ: 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí
              Minh
              <br />
              Điện thoại: 0901 234 567
            </li>
            <li className="py-2">
              <b>LanggomSport Quận 3:</b>
              <br />
              Địa chỉ: 456 Đường Võ Văn Tần, Phường 5, Quận 3, TP. Hồ Chí Minh
              <br />
              Điện thoại: 0902 345 678
              <br />
            </li>
            <li className="py-2">
              <b>LanggomSport Hà Nội:</b>
              <br />
              Địa chỉ: 789 Đường Kim Mã, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội
              <br />
              Điện thoại: 0903 456 789
            </li>
          </ul>
        </div>
        <div className="padingbot col-md-3 col-sm-12 col-lg-3">
          <div className="">
            <h3>Chăm sóc khách hàng</h3>
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
