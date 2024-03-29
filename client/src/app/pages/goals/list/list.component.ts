import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Goal, IGoal } from "src/app/models/goal";
import { GoalsService } from "src/app/services/goals/goals.service";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-goals-page",
    templateUrl: "list.component.html",
    styleUrls: ["list.component.less"],
    standalone: true,
    imports: [
        RouterLink,
        NgFor,
        FormsModule,
        NgIf,
    ],
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
