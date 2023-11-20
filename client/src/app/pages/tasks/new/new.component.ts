import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { Goal } from "src/app/models/goal";
import { ITask, Task } from "src/app/models/task";
import { GoalsService } from "src/app/services/goals/goals.service";
import { TasksService } from "src/app/services/tasks/tasks.service";

@Component({
  selector: "app-new-task-page",
  templateUrl: "new.component.html",
})
export class NewTaskPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private api: TasksService,
    private goalApi: GoalsService
  ) {}

  protected model: ITask = {
    Importance: 1,
  };
  protected goals$ = new BehaviorSubject<Goal[]>([]);

  public ngOnInit(): void {
    this.goalApi
      .listGoals()
      .pipe(take(1))
      .subscribe((response) =>
        this.goals$.next(response.data.map((goalModel) => new Goal(goalModel)))
      );
  }

  protected submitForm(): void {
    const taskModel: Task = new Task(this.model);
    taskModel.Completed = false;

    this.api
      .createTask(taskModel)
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
