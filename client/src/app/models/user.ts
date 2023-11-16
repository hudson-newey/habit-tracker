import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IUser {
  Id?: Id;
  Userame?: string;
  IsAdmin?: boolean;
}

export class User extends AbstractModel<IUser> implements IUser {
  public constructor(data: IUser) {
    super(data);
  }

  public Id!: Id;
  public Username!: string;
  public IsAdmin!: boolean;
}
