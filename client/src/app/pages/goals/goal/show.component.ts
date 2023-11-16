import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { Goal } from "src/app/models/goal";
import { GoalsService } from "src/app/services/goals.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-goal-page",
  templateUrl: "show.component.html",
})
export class GoalPageComponent implements OnInit {
  public constructor(
    private api: GoalsService,
    private route: ActivatedRoute
  ) {}

  protected model?: Goal;

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;

    this.api
      .getGoal(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = new Goal(response.data);
      });
  }
}
