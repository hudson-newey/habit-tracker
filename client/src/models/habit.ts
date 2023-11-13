import { Id } from "src/types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IHabit {
  Id?: Id;
  Name?: string;
  Description?: string;
  AntiHabit?: boolean;
  CompletedDates?: string[];
}

export class Habit extends AbstractModel<IHabit> implements IHabit {
  public constructor(data: IHabit) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
  public AntiHabit!: boolean;
  public CompletedDates!: string[];

  public override get ViewUrl(): any[] {
    return [`/habits`, this.Id];
  }
}
