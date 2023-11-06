import { Id } from "src/types/helpers";

interface IAbstractModel {
  id: Id;
  toString: () => string;
  toJSON: () => string;
}

export abstract class AbstractModel implements IAbstractModel {
  public constructor() {}

  public abstract id: Required<Id>;

  public toString(): string {
    return JSON.stringify(this);
  }

  public toJSON(): string {
    return JSON.stringify(this);
  }
}
