export class User {
  public username: string;
  public token: string;
  constructor(name: string, userToken: string) {
    this.username = name;
    this.token = userToken;
  }
}
