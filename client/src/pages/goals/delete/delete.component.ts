import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { Goal } from "src/models/goal";
import { Task } from "src/models/task";
import { GoalsService } from "src/services/goals.service";
import { Id } from "src/types/helpers";

@Component({
  selector: "app-delete-page",
  templateUrl: "delete.component.html",
})
export class DeleteGoalPageComponent implements OnInit {
  public constructor(
    private api: GoalsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected model?: Goal;

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;

    this.api
      .getGoal(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = new Task(response.data);
      });
  }

  protected deleteModel(): void {
    if (!this.model) {
      throw new Error("Model is not defined");
    }

    this.api
      .deleteGoal(this.model?.Id)
      .pipe(take(1))
      .subscribe(() =>
        this.router.navigateByUrl("/goals")
      );
  }
}
