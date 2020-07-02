export class Comment {
  public id: number;
  public message: string;
  public createdAt: Date;
  public updatedAt: Date;
  public username: string;
  public avatarUrl: string;

  constructor(message: string) {
    this.message = message;
  }
}
