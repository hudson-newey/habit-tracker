import { Id } from "../types/helpers";

interface IAbstractModel {
  Id: Id;
  toString: () => string;
}

export abstract class AbstractModel<T> implements IAbstractModel {
  public constructor(data: T) {
    Object.assign(this, data);
  }

  public abstract Id: Required<Id>;

  public toString(): string {
    return JSON.stringify(this);
  }

  public get ViewUrl(): any[] {
    throw new Error("ViewUrl not implemented");
  }
}