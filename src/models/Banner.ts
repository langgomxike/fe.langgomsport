export default class Banner {
    public id: number;
    public image: string;
    public link: string;

    constructor(id: number= 0, image: string = "", link: string = "") {
        this.id = id;
        this.image = image;
        this.link = link;
    }
}