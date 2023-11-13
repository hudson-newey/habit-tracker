import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { ITask, Task } from "src/models/task";
import { TasksService } from "src/services/tasks.service";

@Component({
  selector: "app-tasks-page",
  templateUrl: "list.component.html",
})
export class TasksPageComponent implements OnInit {
  public constructor(private api: TasksService) {}

  protected tasks: Task[] = [];

  public ngOnInit(): void {
    this.api
      .getTasks()
      .pipe(take(1))
      .subscribe((response) => {
        this.tasks = response.data.map((model: ITask) => new Task(model));
      });
  }
}
