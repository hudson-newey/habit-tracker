import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { Habit, IHabit } from "src/models/habit";
import { HabitService } from "src/services/habits.service";

@Component({
  selector: "app-new-page",
  templateUrl: "new.component.html",
})
export class NewHabitPage {
  public constructor(
    private router: Router,
    private api: HabitService,
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
