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
  TargetValue?: number;
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
  public TargetValue!: number;
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

  public get TimesCompletedToday(): number {
    const currentDate = new Date().toLocaleDateString().split("T")[0];
    return this.CompletedDates?.filter((date: string) => date === currentDate).length ?? 0;
  }

  public get IsCompletedToday(): boolean {
    if (this.IsQuantifiable) {
      return this.TimesCompletedToday >= this.TargetValue;
    }

    return this.TimesCompletedToday > 0;
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
        return dateObject.toLocaleDateString().split("T")[0] ?? [];
      });
    }

    return formattedCompletedDates ?? [];
  }
}
