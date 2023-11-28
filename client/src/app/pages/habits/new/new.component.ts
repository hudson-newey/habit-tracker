import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { Goal } from "src/app/models/goal";
import { IHabit, Habit } from "src/app/models/habit";
import { GoalsService } from "src/app/services/goals/goals.service";
import { HabitsService } from "src/app/services/habits/habits.service";

@Component({
  selector: "app-new-page",
  templateUrl: "new.component.html",
})
export class NewHabitPage implements OnInit {
  public constructor(
    private router: Router,
    private api: HabitsService,
    private goalApi: GoalsService,
  ) {}

  protected model: IHabit = {
    CreatedAt: new Date().toLocaleDateString(),
  };
  protected goals$ = new BehaviorSubject<Goal[]>([]);

  public ngOnInit(): void {
    this.goalApi
      .listGoals()
      .pipe(take(1))
      .subscribe((response) =>
        this.goals$.next(response.data.map((goalModel) => new Goal(goalModel)))
      );
  }

  protected submitForm(): void {
    const habitModel: Habit = new Habit(this.model);

    this.api
      .createHabit(habitModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/"));
  }
}
