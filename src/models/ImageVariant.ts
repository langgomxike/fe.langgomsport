export default class ImageVariant {
    public name: string;
    public enName: string;
    public path: string;
    public capacity: number;
    public createdAt: number;
    public  updatedAt: number;

    constructor(name = "", enName = "", path = "", capacity = 0, createdAt = 0, updatedAt = 0) {
        this.name = name;
        this.enName = enName;
        this.path = path;
        this.capacity = capacity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}