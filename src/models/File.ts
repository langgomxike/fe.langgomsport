import Variant from "./Variant";

export default class File {

    // properties
    id: number;
    name: string;
    capacity: number;
    filePath: string;
    createdAt: number;
    updatedAt: number;


    constructor(id: number, name: string, capacity: number, filePath: string, createdAt: number, updatedAt: number) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.filePath = filePath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}