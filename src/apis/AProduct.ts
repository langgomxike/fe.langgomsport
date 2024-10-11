import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import ProductDTO from "../dtos/ProductDTO";

export default class AProduct {

    public static getAllProducts(
        page: number,
        perPage: number,
        onNext: (data: { products: Array<ProductDTO>, pagination: { page: number, perPage: number, totalPages: number, totalItems: number } }) => void,
        onLoading: (loading: boolean) => void
    ) {
        onLoading(true);
        axios.get(`${process.env.REACT_APP_API_BASE_URL + "/products"}?page=${page}&perPage=${perPage}`, {
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            onLoading(false);
            onNext(response.data); // Trả về dữ liệu gồm cả sản phẩm và phân trang
        }).catch(err => {
            SLog.log(LogType.Error, "getAllProducts", "Cannot get all products", err);
            onLoading(false);
            onNext({ products: [], pagination: { page: 1, perPage: 10, totalPages: 0, totalItems: 0 } });
        });
    }

    public static getProductsFilter(
        page: number,
        perPage: number,
        onNext: (data: {
            products: Array<ProductDTO>,
            pagination: { page: number, perPage: number, totalPages: number, totalItems: number }
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
            queryParams.push(`sizes=${sizeIds.join('&sizes=')}`);
        }
        if (brandIds && brandIds.length > 0) {
            // Thêm các brand vào queryParams
            brandIds.forEach(brandId => {
                queryParams.push(`brands=${brandIds.join('&')}`); // Sử dụng 'brands' để truyền nhiều giá trị
            });
        }
        if (minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);
        if (sort !== undefined) queryParams.push(`sort=${sort}`);

        // Thêm các tham số phân trang
        queryParams.push(`page=${page}`);
        queryParams.push(`perPage=${perPage}`);

        // Tạo URL với các tham số
        const url = `${process.env.REACT_APP_API_BASE_URL}/products?${queryParams.join('&')}`;
        console.log(url)
        axios.get(url, {
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            onLoading(false);
            onNext(response.data); // Trả về dữ liệu gồm cả sản phẩm và phân trang
        }).catch(err => {
            SLog.log(LogType.Error, "getProductsFilter", "Cannot get products", err);
            onLoading(false);
            onNext({ products: [], pagination: { page: 1, perPage: 10, totalPages: 0, totalItems: 0 } });
        });
    }

}