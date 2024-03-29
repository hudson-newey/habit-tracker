import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { Task, ITask } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks/tasks.service";
import { NgIf } from "@angular/common";
import { TasksTableComponent } from "../../../components/tasks-table/tasks-table.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-tasks-page",
    templateUrl: "list.component.html",
    styleUrls: ["list.component.less"],
    standalone: true,
    imports: [
        RouterLink,
        TasksTableComponent,
        NgIf,
    ],
})
export class TasksPageComponent implements OnInit {
  public constructor(private api: TasksService) {}

  protected tasks: Task[] = [];

  protected get completedTasks(): Task[] {
    return this.tasks.filter((task) => task.Completed);
  }

  protected get incompleteTasks(): Task[] {
    return this.tasks.filter((task) => !task.Completed);
  }

  public ngOnInit(): void {
    this.api
      .getTasks()
      .pipe(take(1))
      .subscribe((response) => {
        this.tasks = response.data.map((model: ITask) => new Task(model));
      });
  }

  public updateTask(model: Task): void {
    this.api
      .updateTask(model)
      .pipe(take(1))
      .subscribe((response) => {
        model = new Task(response.data);
      });
  }
}
