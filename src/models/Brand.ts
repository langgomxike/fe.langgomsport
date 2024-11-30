export default class Brand {
  //properties
  id: number;
  name: string;
  image: string;

  //constructor
  constructor(id = -1, name = "", image = "") {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
