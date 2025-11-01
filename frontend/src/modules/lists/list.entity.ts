export class List {
  id!: string;
  title!: string;
  description!: string;

  constructor(data: List) {
    Object.assign(this, data);
  }
}
