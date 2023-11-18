import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IGoal {
  Id?: Id;
  Name?: string;
  Description?: string;
  Completed?: boolean;
  CompleteBy?: string;
}

export class Goal extends AbstractModel<IGoal> implements IGoal {
  public constructor(data: IGoal) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
  public Completed!: boolean;
  public CompleteBy!: string;

  public override get ViewUrl(): any[] {
    return ["/goals", this.Id];
  }

  public override get EditUrl(): any[] {
    return ["/goals", this.Id, "edit"];
  }

  public override get DeleteUrl(): any[] {
    return ["/goals", this.Id, "delete"];
  }
}
