import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Goal, IGoal } from "src/app/models/goal";
import { GoalsService } from "src/app/services/goals/goals.service";

@Component({
  selector: "app-goals-page",
  templateUrl: "list.component.html",
  styleUrls: ["list.component.less"],
})
export class GoalsPageComponent implements OnInit {
  public constructor(private api: GoalsService) {}

  protected goals: Goal[] = [];

  public ngOnInit(): void {
    this.api
      .listGoals()
      .pipe(take(1))
      .subscribe((response) => {
        this.goals = response.data.map((model: IGoal) => new Goal(model));
      });
  }

  public updateGoal(model: Goal): void {
    this.api
      .updateGoal(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Goal(response.data);
      });
  }
}
