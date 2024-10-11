import Brand from "../models/Brand";

export default class BrandDTO {
    public brands: Array<Brand>;

    constructor(brands: Array<Brand>){
        this.brands = brands
    }
}