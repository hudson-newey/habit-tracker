import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { ITask, Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks/tasks.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.less"],
})
export class TasksUpdateComponent {
  public constructor(
    private api: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected model: ITask = {};

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;
    
    this.api
      .getTask(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = response.data;
      });;
  }

  protected submitForm(): void {
    const taskModel: Task = new Task(this.model);

    this.api
      .updateTask(taskModel)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl("/tasks"));
  }

  protected updateImportance(event: any): void {
    const value: string = event.target.value;
    this.model.Importance = parseInt(value, 10);
  }

  protected updateCompleteBy(event: any): void {
    const value: Date = new Date(event.target.value);
    this.model.CompleteBy = value.toISOString();
  }
}
