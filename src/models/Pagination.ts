export default class Pagination {
    public page: number;
    public perPage: number;
    public totalPages: number;
    public totalItems: number;


    constructor(page: number = 0, perPage: number = 20, totalPages: number = 0, totalItems = 0) {
        this.page = page;
        this.perPage = perPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }
    
}