export default class Product {
    id: number;
    name: string;
    description: string;
    brandId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(id = -1, name: "", description: "", brandId = -1, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brandId = brandId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}