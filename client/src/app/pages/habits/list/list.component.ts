import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Habit, IHabit } from "src/app/models/habit";
import { HabitsService } from "src/app/services/habits/habits.service";

@Component({
  selector: "app-list-page",
  templateUrl: "list.component.html",
})
export class HabitListComponent implements OnInit {
  public constructor(private api: HabitsService) {}

  protected habits: Habit[] = [];

  // font-awesome icons
  protected faCheck = faCheck;
  protected faXmark = faXmark;

  protected get inCompleteHabits(): Habit[] {
    return this.habits.filter((habit: Habit) => !this.isCompletedToday(habit));
  }

  protected get completedHabits(): Habit[] {
    return this.habits.filter((habit: Habit) => this.isCompletedToday(habit));
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
    };

    model.CompletedDates.push(new Date().toISOString());

    this.api
      .updateHabit(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Habit(response.data);
      });
  }

  public uncompleteHabit(model: Habit): void {
    const todaysDate: string = new Date().toLocaleDateString("en-CA");

    const indexToRemove: number = model.CompletedDates.findIndex((item: string) => {
      const formattedDate: string = new Date(item).toLocaleDateString("en-CA");
      return todaysDate === formattedDate;
    });

    model.CompletedDates.splice(indexToRemove, 1);

    this.api
      .updateHabit(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Habit(response.data);
      });
  }

  protected isCompletedToday(task: Habit): boolean {
    const lastCompletedDate = task.CompletedDates?.at(-1)?.split("T")[0];
    const today: string = new Date()?.toISOString()?.split("T")[0];

    return lastCompletedDate === today;
  }
}
