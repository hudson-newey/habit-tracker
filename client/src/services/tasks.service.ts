import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service.service";
import { Observable, of } from "rxjs";
import { ITask, Task } from "src/models/task";
import { environment } from "src/environment";
import { createUrl } from "./helpers";
import { HttpClient } from "@angular/common/http";
import { createFakeTask } from "src/models/fakes/task.fake";
import { Id } from "src/types/helpers";
import { EmptyResponse } from "src/types/services";

@Injectable({ providedIn: "root" })
export class TasksService extends AbstractService {
  public constructor(
    public http: HttpClient,
  ) {
    super();
  }

  // GET /tasks
  public getTodaysTasks(): Observable<ITask[]> {
    if (environment.production) {
      const endpoint: string = createUrl("/tasks");
      return this.http.get(endpoint) as Observable<ITask[]>;
    }

    // in the development environment, we should return fake data
    console.debug("/tasks");

    return of([
      createFakeTask(),
      createFakeTask(),
      createFakeTask(),
      createFakeTask(),
      createFakeTask(),
    ]);
  }

  // GET /tasks/:taskId
  public getTask(taskId: Id): Observable<ITask> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${taskId}`);
      return this.http.get(endpoint) as Observable<ITask>;
    }

    return of(createFakeTask());
  }

  // POST /tasks
  public createTask(model: Task): Observable<ITask> {
    if (environment.production) {
      const endpoint: string = createUrl("/tasks");
      return this.http.post(endpoint, model) as Observable<ITask>;
    }

    return of(createFakeTask());
  }

  // PUT /tasks/:taskId
  public updateTask(model: Task): Observable<ITask> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${model.Id}`);
      return this.http.put(endpoint, model) as Observable<ITask>;
    }

    return of(createFakeTask());
  }

  // DELETE /tasks/:taskId
  public deleteTask(taskId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${taskId}`);
      return this.http.delete(endpoint) as Observable<EmptyResponse>;
    }

    return of(undefined);
  }
}
