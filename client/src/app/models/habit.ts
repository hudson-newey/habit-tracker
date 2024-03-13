import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface IHabit {
  Id?: Id;
  Name?: string;
  Description?: string;
  CompletedDates?: string[];
  CreatedAt?: string;
  Goal?: Id;
  AntiHabit?: boolean;
  IsQuantifiable?: boolean;
  DependsOn?: Id[];
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
  public IsQuantifiable!: boolean;
  public DependsOn!: Id[];

  public override get ViewUrl(): any[] {
    return [`/habits`, this.Id];
  }

  public override get EditUrl(): any[] {
    return [`/habits`, this.Id, "edit"];
  }

  public override get DeleteUrl(): any[] {
    return [`/habits`, this.Id, "delete"];
  }

  // returns a boolean specifying if the habit has been completed today
  public get IsCompletedToday(): boolean {
    const currentDate = new Date().toLocaleDateString().split("T")[0];
    return this.CompletedDates?.includes(currentDate) ?? false;
  }

  // get the dates in the format yyyy-MM-dd
  public get FormattedCompletedDates(): string[] {
    let formattedCompletedDates: string[] = [];

    if (this.AntiHabit) {
      const currentDate = new Date();
      const createdAtDate = new Date(this.CreatedAt);

      for (
        let date = createdAtDate;
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toLocaleDateString().split("T")[0];
        if (!this.CompletedDates || !this.CompletedDates.includes(formattedDate)) {
          formattedCompletedDates.push(formattedDate);
        }
      }
    } else {
      formattedCompletedDates = this.CompletedDates?.map((date: string) => {
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString().split("T")[0];
      });
    }

    return formattedCompletedDates;
  }
}
