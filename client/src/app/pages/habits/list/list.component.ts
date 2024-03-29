import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Habit, IHabit } from "src/app/models/habit";
import { HabitsService } from "src/app/services/habits/habits.service";
import { NgIf } from "@angular/common";
import { HabitsTableComponent } from "../../../components/habits-table/habits-table.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-list-page",
    templateUrl: "list.component.html",
    styleUrls: ["list.component.less"],
    standalone: true,
    imports: [
        RouterLink,
        HabitsTableComponent,
        NgIf,
    ],
})
export class HabitListComponent implements OnInit {
  public constructor(private api: HabitsService) {}

  protected habits: Habit[] = [];

  protected get inCompleteHabits(): Habit[] {
    return this.habits.filter((habit: Habit) => !this.isCompletedToday(habit));
  }

  protected get completedHabits(): Habit[] {
    return this.habits.filter(
      (habit: Habit) => !habit.AntiHabit && this.isCompletedToday(habit)
    );
  }

  protected get failedAntiHabits(): Habit[] {
    return this.habits.filter(
      (habit: Habit) => habit.AntiHabit && this.isCompletedToday(habit)
    );
  }

  public ngOnInit(): void {
    this.api
      .getHabits()
      .pipe(take(1))
      .subscribe((response) => {
        this.habits = response.data.map((model: IHabit) => new Habit(model));
      });
  }

  public completeHabit(model: Habit): void {
    if (!model.CompletedDates?.length) {
      model.CompletedDates = [];
    }

    model.CompletedDates.push(new Date().toLocaleDateString());

    this.api
      .updateHabit(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Habit(response.data);
      });
  }

  public uncompleteHabit(model: Habit): void {
    const todaysDate: string = new Date().toLocaleDateString();

    const indexToRemove: number = model.CompletedDates.findIndex(
      (item: string) => {
        const formattedDate: string = new Date(item).toLocaleDateString();
        return todaysDate === formattedDate;
      }
    );

    model.CompletedDates.splice(indexToRemove, 1);

    this.api
      .updateHabit(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Habit(response.data);
      });
  }

  protected isCompletedToday(model: Habit): boolean {
    return model.IsCompletedToday;
  }
}
