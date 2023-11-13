import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Habit, IHabit } from "src/models/habit";
import { HabitService } from "src/services/habits.service";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-list-page",
  templateUrl: "list.component.html",
})
export class HabitListComponent implements OnInit {
  public constructor(private api: HabitService) {}

  protected habits: Habit[] = [];

  // font-awesome icons
  protected faCheck = faCheck;
  protected faXmark = faXmark;

  public ngOnInit(): void {
    this.api
      .getHabits()
      .pipe(take(1))
      .subscribe((response) => {
        this.habits = response.data.map((model: IHabit) => new Habit(model));
      });
  }
}
