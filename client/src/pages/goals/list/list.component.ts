import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Goal, IGoal } from "src/models/goal";
import { GoalsService } from "src/services/goals.service";

@Component({
  selector: "app-goals-page",
  templateUrl: "list.component.html",
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
}
