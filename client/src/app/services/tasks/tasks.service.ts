import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment";
import { createUrl } from "../helpers";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "../abstract-service.service";
import { createFakeTask } from "../../models/fakes/task.fake";
import { ITask, Task } from "../../models/task";
import { Id } from "../../types/helpers";
import { ApiHttpResponse, EmptyResponse } from "../../types/services";

@Injectable({ providedIn: "root" })
export class TasksService extends AbstractService {
  public constructor(
    public http: HttpClient,
  ) {
    super();
  }

  public getTodaysRemainingTasks(): Observable<ApiHttpResponse<ITask[]>> {
    throw new Error("Not implemented");
  }

  // GET /tasks
  public getTasks(): Observable<ApiHttpResponse<ITask[]>> {
    if (environment.production) {
      const endpoint: string = createUrl("/tasks");
      return this.http.get(endpoint) as Observable<ApiHttpResponse<ITask[]>>
    }

    // in the development environment, we should return fake data
    console.debug("/tasks");

    return of({
      data: [
        createFakeTask(),
        createFakeTask(),
        createFakeTask(),
        createFakeTask(),
        createFakeTask(),
      ],
      message: "success",
    });
  }

  // GET /tasks/:taskId
  public getTask(taskId: Id): Observable<ApiHttpResponse<ITask>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${taskId}`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<ITask>>
    }

    console.debug(taskId);
    return of({
      data: createFakeTask(),
      message: "success",
    });
  }

  // POST /tasks
  public createTask(model: Task): Observable<ApiHttpResponse<ITask>> {
    if (environment.production) {
      const endpoint: string = createUrl("/tasks");
      return this.http.post(endpoint, model) as Observable<ApiHttpResponse<ITask>>
    }

    console.debug(model);
    return of({
      data: createFakeTask(),
      message: "success",
    });
  }

  // PUT /tasks/:taskId
  public updateTask(model: Task): Observable<ApiHttpResponse<ITask>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${model.Id}`);
      return this.http.put(endpoint, model) as Observable<ApiHttpResponse<ITask>>
    }

    console.debug(model);
    return of({
      data: createFakeTask(),
      message: "success",
    });
  }

  // DELETE /tasks/:taskId
  public deleteTask(taskId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/tasks/${taskId}`);
      return this.http.delete(endpoint) as Observable<EmptyResponse>
    }

    console.debug(taskId);
    return of(undefined);
  }
}
