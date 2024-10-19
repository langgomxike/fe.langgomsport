import Category from "./Category";

export default class CategoryInCategories {
    public categoryParent: Category;
    public categories: Array<Category>;

    constructor(categoryParent: Category, categories: Array<Category>){
        this.categoryParent = categoryParent;
        this.categories = categories
    }
}