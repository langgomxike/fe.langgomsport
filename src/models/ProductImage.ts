import ImageVariant from "./ImageVariant";
import Product from "./Product";

export default class ProductImage {
    public product: Product;
    public images: ImageVariant[];

    constructor(product: Product, images: ImageVariant[]) {
        this.product = product;
        this.images = images;
    }
}   