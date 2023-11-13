import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { Goal, IGoal } from "src/models/goal";
import { GoalsService } from "src/services/goals.service";

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
}
