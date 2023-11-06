import { Id } from "src/types/helpers";
import { AbstractModel } from "./abstractModel";

interface IHabit {
  id: Id;
  name: string;
  description: string;
  completedAt: Date[];
}

export class Habit extends AbstractModel implements IHabit {
  public constructor(data: IHabit) {
    super();
    
    Object.assign(this, data);
  }

  public id!: Id;
  public name!: string;
  public description!: string;
  public completedAt!: Date[];
}
