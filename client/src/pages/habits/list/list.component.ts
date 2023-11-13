import { AfterViewInit, Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Habit, IHabit } from "src/models/habit";
import { HabitService } from "src/services/habits.service";

@Component({
  selector: "app-list-page",
  templateUrl: "list.component.html",
})
export class HabitListComponent implements OnInit {
  public constructor(private api: HabitService) {}

  protected habits: Habit[] = [];

  public ngOnInit(): void {
    // this.api
    //   .getHabits()
    //   .pipe(take(1))
    //   .subscribe((models: IHabit[]) => {
    //     this.habits = models.map((model: IHabit) => new Habit(model));
    //   });
    this.api.getHabits().subscribe(
      (response) => { console.log(response); },
      (error) => { console.log(error); });
  }
}