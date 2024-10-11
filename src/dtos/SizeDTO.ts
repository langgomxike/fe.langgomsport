import Size from "../models/Size";
export default class SizeDTO {
    // properties
    id: number;
    size: string;


    constructor(id= 0, size= "") {
        this.id = id;
        this.size = size;
    }
}