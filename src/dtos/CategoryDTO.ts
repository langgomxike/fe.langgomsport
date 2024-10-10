import Category from "../models/Category";

export default class CategoryDTO {
    public categoryParent: Category;
    public categories: Array<Category>;

    constructor(categoryParent: Category, categories: Array<Category>){
        this.categoryParent = categoryParent;
        this.categories = categories
    }
}