export interface IAuthentication {
  username: string;
  password: string;
}

export class Authentication {
  public constructor(data: IAuthentication) {
    Object.assign(this, data);
  }

  public username!: string;
  public password!: string;
}
