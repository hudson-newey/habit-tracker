import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface ITask {
  Id?: Id;
  Name?: string;
  Description?: string;
  Completed?: boolean;
  Goal?: Id;
  Importance?: number;
}

export class Task extends AbstractModel<ITask> implements ITask {
  public constructor(data: ITask) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
  public Completed!: boolean;
  public Goal!: Id;
  public Importance!: number;

  public override get ViewUrl(): any[] {
    return [`/tasks`, this.Id];
  }
}
