import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "src/app/models/task";

@Component({
  selector: "app-tasks-table",
  templateUrl: "./tasks-table.component.html",
  styleUrls: ["./tasks-table.component.less"],
})
export class TasksTableComponent {
  public constructor() { }

  @Input()
  public models: Task[] = [];

  @Output()
  public changeState = new EventEmitter<Task>();
}
