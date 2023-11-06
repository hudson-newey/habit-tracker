import { Id } from "src/types/helpers";
import { AbstractModel } from "./abstractModel";

interface IHabit {
  Id: Id;
  Name: string;
  Description: string;
}

export class Habit extends AbstractModel implements IHabit {
  public constructor(data: IHabit) {
    super();
    
    Object.assign(this, data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
}
