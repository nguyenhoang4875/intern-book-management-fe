export class User {
  public id: number;
  public username: string;
  public token: string;
  public roles: Array<IRole>;
  constructor(
    id: number,
    name: string,
    userToken: string,
    roles: Array<IRole>
  ) {
    this.id = id;
    this.username = name;
    this.token = userToken;
    this.roles = roles;
  }
}

export interface IRole {
  id: number;
  name: string;
}
