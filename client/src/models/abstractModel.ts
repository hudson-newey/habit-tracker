import { Id } from "src/types/helpers";

interface IAbstractModel {
  Id: Id;
  toString: () => string;
  toJSON: () => string;
}

export abstract class AbstractModel implements IAbstractModel {
  public constructor() {}

  public abstract Id: Required<Id>;

  public toString(): string {
    return JSON.stringify(this);
  }

  public toJSON(): string {
    return JSON.stringify(this);
  }
}
