import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IHabit {
  Id?: Id;
  Name?: string;
  Description?: string;
  AntiHabit?: boolean;
  CompletedDates?: string[];
  CreatedAt?: string;
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
  public CreatedAt!: string; // as ISO 8601
  public Goal!: Id;

  public override get ViewUrl(): any[] {
    return [`/habits`, this.Id];
  }

  public override get EditUrl(): any[] {
    return [`/habits`, this.Id, "edit"];
  }

  public override get DeleteUrl(): any[] {
    return [`/habits`, this.Id, "delete"];
  }

  // get the dates in the format yyyy-MM-dd
  public get FormattedCompletedDates(): string[] {
    if (this.AntiHabit) {
      const currentDate = new Date();
      const createdAtDate = new Date(this.CreatedAt);
      const formattedCompletedDates = [];

      for (
        let date = createdAtDate;
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split("T")[0];
        if (!this.CompletedDates || !this.CompletedDates.includes(formattedDate)) {
          formattedCompletedDates.push(formattedDate);
        }
      }

      return formattedCompletedDates;
    } else {
      return this.CompletedDates?.map((date: string) => {
        const dateObject = new Date(date);
        return dateObject.toISOString().split("T")[0];
      });
    }
  }
}
