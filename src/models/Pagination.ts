export default class Pagination {
    public page: number;
    public perPage: number;
    public totalPages: number;
    public totalItems: number;


    constructor() {
        this.page = 1;
        this.perPage = 10;
        this.totalPages = 0;
        this.totalItems = 0;
    }
}