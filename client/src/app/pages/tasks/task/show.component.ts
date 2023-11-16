import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-task-page",
  templateUrl: "show.component.html",
})
export class TaskPageComponent implements OnInit {
  public constructor(
    private api: TasksService,
    private route: ActivatedRoute
  ) {}

  protected model?: Task;

  public ngOnInit(): void {
    const modelId: Id = this.route.snapshot.paramMap.get("id") as Id;

    this.api.getTask(modelId)
      .pipe(take(1))
      .subscribe((response) => {
        this.model = new Task(response.data);
      });
  }
}
