import { Id } from "src/types/helpers";
import { AbstractModel } from "./abstractModel";

export interface ITask {
  Id?: Id;
  Name?: string;
  Description?: string;
}

export class Task extends AbstractModel<ITask> implements ITask {
  public constructor(data: ITask) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
}
