export default class Brand {
  //properties
  id: number;
  name: string;
  image: string;
  slug: string;

  //constructor
  constructor(id = -1, name = "", image = "", slug = "") {
    this.id = id;
    this.name = name;
    this.image = image;
    this.slug = slug;
  }
}
