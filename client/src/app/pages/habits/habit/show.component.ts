import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Habit } from "src/app/models/habit";
import { Id } from "src/app/types/helpers";
import { HabitsService } from "src/app/services/habits/habits.service";

@Component({
  selector: "app-habit-page",
  templateUrl: "show.component.html",
})
export class HabitShowPageComponent implements OnInit {
  public constructor(
    private api: HabitsService,
    private route: ActivatedRoute
  ) {}

  protected model?: Habit;

  // font-awesome icons
  protected faCheck = faCheck;
  protected faXmark = faXmark;

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;

    this.api
      .getHabit(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = new Habit(response.data);
      });
  }
}
