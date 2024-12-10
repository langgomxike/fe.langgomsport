import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Pagination from "../models/Pagination";
import Product from "../models/Product";
import ConfigValue from "../configs/ConfigValue";

const RELATED_PRODUCT_LIMIT = ConfigValue.RELATED_PRODUCT_LIMIT;
const PERPAGE_PRODUCT_LIMIT = ConfigValue.PERPAGE_PRODUCT_LIMIT;
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

  public static BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/products`;

  public static getProductsFilter(
    page: number,
    onNext: (data: {
      products: Product[];
      pagination: Pagination;
      highestPrice: number;
    }) => void,
    onLoading: (loading: boolean) => void,
    categoryId?: number,
    sizeIds?: number[],
    brandIds?: number[],
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
  ) {
    onLoading(true);

    // Xây dựng các tham số truy vấn
    const queryParams: string[] = [];

    if (categoryId !== undefined) queryParams.push(`categoryId=${categoryId}`);
    if (sizeIds && sizeIds.length > 0) {
      // Thêm các size vào queryParams
      queryParams.push(`sizeIds=${sizeIds.join("&sizeIds=")}`);
    }
    if (brandIds && brandIds.length > 0) {
      // Thêm các brand vào queryParams
      brandIds.forEach((brandId) => {
        queryParams.push(`brandIds=${brandIds.join("&brandIds=")}`); // Sử dụng 'brands' để truyền nhiều giá trị
      });
    }
    
    if (minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);
    if (sort !== undefined) queryParams.push(`sort=${sort}`);

    // Thêm các tham số phân trang
    queryParams.push(`page=${page}`);
    queryParams.push(`perPage=${PERPAGE_PRODUCT_LIMIT}`);

    // Tạo URL với các tham số
    const url = `${
      process.env.REACT_APP_API_BASE_URL
    }/products?${queryParams.join("&")}`;

    console.log(">> url product", url);
    
    
    axios
      .get(url, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const productsWithImages = response.data.products.map((item:any) => ({
          // Sao chép toàn bộ thuộc tính của product
          ...item.product,   
          // Gán mảng images từ item      
          images: item.images || [] 
        }));

        onNext({
          products: productsWithImages,
          pagination: response.data.pagination,
          highestPrice:  response.data.highestPrice
        });
        

        onLoading(false);
      })
      .catch((err) => {
        SLog.log(
          LogType.Error,
          "getProductsFilter",
          "Cannot get products",
          err
        );
        onLoading(false);
        onNext({
          products: [],
          pagination: { page: 1, perPage: PERPAGE_PRODUCT_LIMIT, totalPages: 0, totalItems: 0 },
          highestPrice: 0
        });
      });
  }

  public static getProductById(
    slug: string,
    onNext: (product: Product, relatedProducts: Product[]) => void,
    onLoading: (loading: boolean) => void
  ) {
    
    // Tạo URL với các tham số
    const url = `${process.env.REACT_APP_API_BASE_URL}/products/detail?slug=${slug}&limit=${RELATED_PRODUCT_LIMIT}`;
    // console.log(">>> detail url: " + url);
    
    onLoading(true);
    axios
      .get(url, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const detailProduct = response.data.detail.product;
        detailProduct.images = response.data.detail.images;

        const relatedProducts = response.data.related_products.map((item:any) => ({
          ...item.product,    
          images: item.images || [] 
        }));

        onNext( detailProduct, relatedProducts);

        // console.log(">>> product detail: ", detailProduct);
        // console.log(">>> product realted: ", response.data.related_products);
        
        onLoading(false);
      })
      .catch((err) => {
       console.log("Error: ", err);
       
        onLoading(false);
      });
  }

  public static getProductsSaleOff(
    onNext: (products: Product[]) => void,
    onLoading: (loading: boolean) => void
  ){
      onLoading(true)
      axios.get(`${this.BASE_URL}/sale-off`)
      .then((response) => {
        const productsWithImages = response.data.map((item:any) => ({
          ...item.product,      
          images: item.images || [] 
        }));

        onNext(productsWithImages);

        onLoading(false)
      })
      .catch((err) => {
        console.log("getProductsSaleOff Error: ", err);
      })
  }

  public static getProductsNewest(
    onNext: (products: Product[]) => void,
    onLoading: (loading: boolean) => void
  ){
      onLoading(true)
      axios.get(`${this.BASE_URL}/newest`)
      .then((response) => {
        const productsWithImages = response.data.map((item:any) => ({
          ...item.product,      
          images: item.images || [] 
        }));

        onNext(productsWithImages);

        onLoading(false)
      })
      .catch((err) => {
        console.log("getProductsNewest Error: ", err);
      })
  }
}
