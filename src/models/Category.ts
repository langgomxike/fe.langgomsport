export default class Category {

    //properties
    id: number;
    name: string;
    parentId: number;

    //constructor
    constructor(
        id = -1,
        name = '',
        parentId = 0
    ) {
        this.id = id
        this.name = name
        this.parentId = parentId
    }
    

}