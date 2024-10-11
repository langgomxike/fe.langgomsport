export default class Brand {
  //properties
  id: number;
  name: string;

  //constructor
  constructor(id = -1, name = "") {
    this.id = id;
    this.name = name;
  }
}
