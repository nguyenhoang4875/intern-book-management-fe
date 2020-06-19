export class Book {
  public id: number;
  public title: string;
  public description: string;
  public author: string;
  public image: string;
  public createdAt: Date;
  public updatedAt: Date;
  public enabled: number;
  public username: string;

  constructor(
    id: number,
    title: string,
    description: string,
    author: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
    enabled: number,
    username: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.enabled = enabled;
    this.username = username;
  }
}
