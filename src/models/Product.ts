import Variant from "./Variant";
import Brand from "./Brand";
import Category from "./Category";
import ImageVariant from "./ImageVariant";
export default class Product {

    // properties
    id: number;
    name: string;
    enName: string;
    slug: string;
    code: string;
    description: string;
    price: number;
    discount: number;
    descPrice: number;
    brand: Brand | undefined;
    categories: Category[] | undefined;
    variants: Variant[] | undefined;
    images: ImageVariant[];
    createdAt: number;
    updatedAt: number


    constructor(id: number = 0, name: string = "", enName: string = "" ,slug:string = "", code:string = "",price: number = 0, description: string = "", discount:number = 0, descPrice = 0 ,brand: Brand | undefined = undefined, categories: Category[] | undefined, variants: Variant[] | undefined = [], images: ImageVariant[], createdAt: number = 0, updatedAt: number = 0) {
        this.id = id;
        this.name = name;
        this.enName = enName;
        this.slug = slug;
        this.code = code
        this.price = price;
        this.description = description;
        this.discount = discount
        this.descPrice = descPrice
        this.brand = brand;
        this.categories = this.categories
        this.variants = variants;
        this.images = images;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}