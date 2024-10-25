export default class Category {

    //properties
    id: number;
    name: string;
    parent: Category;

    //constructor
    constructor(
        id = -1,
        name = '',
        parent = new Category()
    ) {
        this.id = id
        this.name = name
        this.parent = parent
    }
    
    
}