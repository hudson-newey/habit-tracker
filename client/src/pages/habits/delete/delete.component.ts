import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { Habit } from "src/models/habit";
import { HabitService } from "src/services/habits.service";

@Component({
  selector: "app-delete-habit-page",
  templateUrl: "delete.component.html",
})
export class DeleteHabitPageComponent implements OnInit {
  public constructor(
    private api: HabitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected model?: Habit;

  public ngOnInit(): void {
    const modelId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.api
      .getHabit(modelId)
      .pipe(take(1))
      .subscribe((model) => {
        this.model = new Habit(model);
      });
  }

  protected deleteModel(): void {
    if (!this.model) {
      throw new Error("Model is not defined");
    }

    this.api
      .deleteHabit(this.model?.Id)
      .pipe(take(1))
      .subscribe(() =>
        this.router.navigateByUrl("/")
      );
  }
}
