import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { Goal, IGoal } from "src/app/models/goal";
import { GoalsService } from "src/app/services/goals/goals.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.less"],
})
export class GoalsUpdateComponent implements OnInit {
  public constructor(
    private api: GoalsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected model: IGoal = {};

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;
    
    this.api
      .getGoal(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = response.data;
      });;
  }

  protected submitForm(): void {
    const goalModel: Goal = new Goal(this.model);

    this.api
      .updateGoal(goalModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/goals"));
  }

  protected updateCompleteBy(event: any): void {
    const value: Date = new Date(event.target.value);
    this.model.CompleteBy = value.toLocaleDateString();
  }
}
