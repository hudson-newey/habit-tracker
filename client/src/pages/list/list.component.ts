import { AfterViewInit, Component, OnInit } from "@angular/core";
import { HabitService } from "src/services/habits.service";

@Component({
  selector: "app-list-page",
  templateUrl: "list.component.html",
})
export class ListComponent implements OnInit {
  public constructor(private api: HabitService) {}

  public ngOnInit(): void {
    this.api.getHabits();
  }
}
