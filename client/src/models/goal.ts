import { Id } from "src/types/helpers";
import { AbstractModel } from "./abstractModel";

interface IGoal {
  Id: Id;
  Name: string;
  Description: string;
}

export class Goal extends AbstractModel<IGoal> implements IGoal {
  public constructor(data: IGoal) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
}
