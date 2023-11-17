import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { IHabit, Habit } from "src/app/models/habit";
import { HabitsService } from "src/app/services/habits/habits.service";

@Component({
  selector: "app-new-page",
  templateUrl: "new.component.html",
})
export class NewHabitPage {
  public constructor(
    private router: Router,
    private api: HabitsService,
  ) {}

  protected model: IHabit = {};

  protected submitForm(): void {
    const habitModel: Habit = new Habit(this.model);

    this.api
      .createHabit(habitModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/"));
  }
}
