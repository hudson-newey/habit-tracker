import { Component } from "@angular/core";
import { AbstractFormComponent } from "../abstract-form.component";
import { GoalsService } from "src/app/services/goals/goals.service";
import { Goal, IGoal } from "src/app/models/goal";
import { take } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-goal-form",
  templateUrl: "./goal-form.component.html",
  styleUrl: "./goal-form.component.less",
})
export class GoalFormComponent extends AbstractFormComponent<IGoal> {
  public constructor(
    private api: GoalsService,
    private router: Router,
  ) {
    super();
  }

  public submitForm(): void {
    const goalModel: Goal = new Goal(this.model);

    if (this.creating) {
      this.api
        .createGoal(goalModel)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(["/goals"]);
        });

      return;
    }

    this.api
      .updateGoal(goalModel)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(goalModel.ViewUrl);
      });
  }

  protected updateCompleteBy(event: any): void {
    const value: Date = new Date(event.target.value);
    this.model.CompleteBy = value.toLocaleDateString();
  }
}
