import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Habit } from "src/app/models/habit";
import { HabitsService } from "src/app/services/habits/habits.service";

@Component({
  selector: "app-habits-table",
  templateUrl: "./habits-table.component.html",
  styleUrls: ["./habits-table.component.less"],
})
export class HabitsTableComponent {
  public constructor(private habitService: HabitsService) { }

  // font-awesome icons
  protected faCheck = faCheck;
  protected faXmark = faXmark;

  @Input({ required: true })
  public models: Habit[] = [];

  @Output()
  public changeState = new EventEmitter<Habit>();

  public incrementValue(habit: Habit): void {
    habit.Value ??= 0;

    habit.Value++;

    this.habitService.updateHabit(habit).subscribe(() => {
      if (habit.Value >= habit.TargetValue) {
        this.changeState.emit(habit);
      }
    });
  }
}
