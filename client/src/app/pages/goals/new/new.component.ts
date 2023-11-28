import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { IGoal, Goal } from "src/app/models/goal";
import { GoalsService } from "src/app/services/goals/goals.service";

@Component({
  selector: "app-new-goal-page",
  templateUrl: "new.component.html",
})
export class NewGoalPageComponent {
  public constructor(
    private api: GoalsService,
    private router: Router
  ) {}

  protected model: IGoal = {};

  protected submitForm(): void {
    const goalModel: Goal = new Goal(this.model);
    goalModel.Completed = false;

    this.api
      .createGoal(goalModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/goals"));
  }

  protected updateCompleteBy(event: any): void {
    const value: Date = new Date(event.target.value);
    this.model.CompleteBy = value.toLocaleDateString();
  }
}
