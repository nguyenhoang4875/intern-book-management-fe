export class UserDetail {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  enabled: string;
  email: string;
  avatar: string;
  constructor(init?: Partial<UserDetail>) {
    Object.assign(this, init);
  }
}
