import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { ITask, Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks/tasks.service";

@Component({
  selector: "app-new-task-page",
  templateUrl: "new.component.html",
})
export class NewTaskPageComponent {
  public constructor(
    private router: Router,
    private api: TasksService,
  ) {}

  protected model: ITask = {};

  protected submitForm(): void {
    const taskModel: Task = new Task(this.model);
    taskModel.Completed = false;

    this.api
      .createTask(taskModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/tasks"));
  }
}
