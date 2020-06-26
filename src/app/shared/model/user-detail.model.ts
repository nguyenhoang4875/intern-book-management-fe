export class UserDetail {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  enabled: string;
  email: string;
  avatar: string;
  
  constructor(init?: Partial<UserDetail>) {
    Object.assign(this, init);
  }
}
