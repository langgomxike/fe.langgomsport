import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import ProductDTO from "../dtos/ProductDTO";
import pagination from "../views/components/Pagination/Pagination";
import Pagination from "../models/Pagination";
import Product from "../models/Product";

export default class AProduct {

    // public static getAllProducts(
    //     page: number,
    //     perPage: number,
    //     onNext: (data: { products: Array<ProductDTO>, pagination: { page: number, perPage: number, totalPages: number, totalItems: number } }) => void,
    //     onLoading: (loading: boolean) => void
    // ) {
    //     onLoading(true);
    //     axios.get(`${process.env.REACT_APP_API_BASE_URL + "/products"}?page=${page}&perPage=${perPage}`, {
    //         headers: { "Content-Type": "application/json" }
    //     }).then(response => {
    //         onLoading(false);
    //         onNext(response.data); // Trả về dữ liệu gồm cả sản phẩm và phân trang
    //     }).catch(err => {
    //         SLog.log(LogType.Error, "getAllProducts", "Cannot get all products", err);
    //         onLoading(false);
    //         onNext({ products: [], pagination: { page: 1, perPage: 10, totalPages: 0, totalItems: 0 } });
    //     });
    // }



    public static getProductsFilter(
        page: number,
        perPage: number,
        onNext: (data: {
            products: Array<ProductDTO>,
            pagination: Pagination
        }) => void,
        onLoading: (loading: boolean) => void,
        categoryId?: number,
        sizeIds?: number[],
        brandIds?: number[],
        minPrice?: number,
        maxPrice?: number,
        sort?: boolean
    ) {
        onLoading(true);

        // Xây dựng các tham số truy vấn
        const queryParams: string[] = [];

        if (categoryId !== undefined) queryParams.push(`categoryId=${categoryId}`);
        if (sizeIds && sizeIds.length > 0) {
            // Thêm các size vào queryParams
            queryParams.push(`sizeIds=${sizeIds.join('&sizeIds=')}`);
        }
        if (brandIds && brandIds.length > 0) {
            // Thêm các brand vào queryParams
            brandIds.forEach(brandId => {
                queryParams.push(`brandIds=${brandIds.join('&brandIds=')}`); // Sử dụng 'brands' để truyền nhiều giá trị
            });
        }

        console.log('Sort', sort)
        if (minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);
        if (sort !== undefined) queryParams.push(`sort=${sort}`);

        // Thêm các tham số phân trang
        queryParams.push(`page=${page}`);
        queryParams.push(`perPage=${perPage}`);

        // Tạo URL với các tham số
        const url = `${process.env.REACT_APP_API_BASE_URL}/products?${queryParams.join('&')}`;
        axios.get(url, {
            headers: { "Content-Type": "application/json" }
        }).then(response => {

            onNext({
                products: response.data.products, // Array of ProductDTOs
                pagination: response.data.pagination // Pagination object
            });

            onLoading(false);


        }).catch(err => {
            SLog.log(LogType.Error, "getProductsFilter", "Cannot get products", err);
            onLoading(false);
            onNext({ products: [], pagination: { page: 1, perPage: 10, totalPages: 0, totalItems: 0 } });
        });
    }

    public static getProductById(id: number, onNext: (product: Product | undefined) => void) {
        // Tạo URL với các tham số
        const url = `${process.env.REACT_APP_API_BASE_URL}/products?id=${id}`;

        axios.get<Product | undefined>(url, {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {

            })
            .catch(err => {

            })
            .finally(() => {
                const product: any = { description: "" };
                product.description =
                    `### Giày chạy bộ 361° Nam W572432219-1

- **Chất liệu**: Knittings + PP30IP + TPU
- **Dòng sản phẩm**: Running / Chạy bộ
- **Xuất xứ**: Trung Quốc

#### Đế ngoài cao su chống trượt:
Đế giày được làm từ cao su chống trượt, giúp tăng cường độ bám trên nhiều bề mặt khác nhau, từ đường phố đến đường mòn.

#### Thiết kế nhẹ nhàng:
Giày chạy bộ 361° thường có thiết kế nhẹ nhàng, giúp giảm tải trọng lên chân và tăng cường sự linh hoạt trong từng bước chạy.

#### Thông thoáng và thoải mái:
Nhiều mẫu giày của 361° được thiết kế với các lỗ thông hơi và vật liệu thoáng khí, giúp giữ cho chân luôn khô ráo và thoải mái trong suốt quá trình chạy.

#### Đa dạng về kiểu dáng và màu sắc:
361° cung cấp nhiều mẫu mã và màu sắc khác nhau, phù hợp với nhiều phong cách và sở thích cá nhân của người dùng.

---

![Hình ảnh minh hoạ](https://file.hstatic.net/200000378371/file/_bcd0026_grande.jpg)

---

### Hướng dẫn bảo quản sản phẩm 361°

- Giặt sạch vết bẩn ở nhiệt độ thường
- Không dùng chất tẩy
- Tránh phơi giày dưới ánh nắng gắt
`;

                onNext(product);
            });
    }

}