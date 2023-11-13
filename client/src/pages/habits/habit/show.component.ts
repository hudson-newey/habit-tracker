import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { Habit, IHabit } from "src/models/habit";
import { HabitService } from "src/services/habits.service";
import { Id } from "src/types/helpers";

@Component({
  selector: "app-habit-page",
  templateUrl: "show.component.html",
})
export class HabitShowPageComponent implements OnInit {
  public constructor(
    private api: HabitService,
    private route: ActivatedRoute
  ) {}

  protected model?: Habit;

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
