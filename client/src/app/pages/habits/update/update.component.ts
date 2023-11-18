import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { Habit, IHabit } from "src/app/models/habit";
import { HabitsService } from "src/app/services/habits/habits.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.less"],
})
export class HabitsUpdateComponent {
  public constructor(
    private api: HabitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected model: IHabit = {};

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;

    this.api
      .getHabit(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = response.data;
      });
  }

  protected submitForm(): void {
    const habitModel: Habit = new Habit(this.model);

    this.api
      .updateHabit(habitModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/"));
  }
}
