import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IHabit {
  Id?: Id;
  Name?: string;
  Description?: string;
  AntiHabit?: boolean;
  CompletedDates?: string[];
  Goal?: Id;
}

export class Habit extends AbstractModel<IHabit> implements IHabit {
  public constructor(data: IHabit) {
    super(data);
  }

  public Id!: Id;
  public Name!: string;
  public Description!: string;
  public AntiHabit!: boolean;
  public CompletedDates!: string[]; // as ISO 8601
  public Goal!: Id;

  public override get ViewUrl(): any[] {
    return [`/habits`, this.Id];
  }

  // get the dates in the format yyyy-MM-dd
  public get FormattedCompletedDates(): string[] {
    return this.CompletedDates.map((date: string) => {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString("en-CA");
    });
  }
}
