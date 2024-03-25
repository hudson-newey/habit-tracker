import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Habit } from "src/app/models/habit";

@Component({
  selector: "app-habits-table",
  templateUrl: "./habits-table.component.html",
  styleUrls: ["./habits-table.component.less"],
})
export class HabitsTableComponent {
  public constructor() { }

  // font-awesome icons
  protected faCheck = faCheck;
  protected faXmark = faXmark;

  @Input({ required: true })
  public models: Habit[] = [];

  @Output()
  public changeState = new EventEmitter<Habit>();

  @Output()
  public decrementState = new EventEmitter<Habit>();
}
