export default class Category {

    //properties
    id: number;
    name: string;
    enName: string;
    parent: Category;

    //constructor
    constructor(id = -1, name = '', enName = '', parent = new Category()
    ) {
        this.id = id;
        this.name =  name;
        this.enName = enName;
        this.parent = parent
    }
    
    
}