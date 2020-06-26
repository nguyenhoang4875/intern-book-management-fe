export class User {
  public username: string;
  public token: string;
  public roles: Array<IRole>;
  constructor(name: string, userToken: string, roles: Array<IRole>) {
    this.username = name;
    this.token = userToken;
    this.roles = roles;
  }
}

export interface IRole {
  id: number;
  name: string;
}
