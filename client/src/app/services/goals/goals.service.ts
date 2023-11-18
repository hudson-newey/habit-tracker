import { Injectable } from "@angular/core";
import { AbstractService } from "../abstract-service.service";
import { environment } from "src/environment";
import { createUrl } from "../helpers";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { createFakeGoal } from "../../models/fakes/goal.fake";
import { IGoal, Goal } from "../../models/goal";
import { Id } from "../../types/helpers";
import { ApiHttpResponse, EmptyResponse } from "../../types/services";
import { ITask } from "src/app/models/task";
import { createFakeTask } from "src/app/models/fakes/task.fake";
import { IHabit } from "src/app/models/habit";
import { createFakeHabit } from "src/app/models/fakes/habit.fake";

@Injectable({ providedIn: "root" })
export class GoalsService extends AbstractService {
  public constructor(private http: HttpClient) {
    super();
  }

  // GET /goals
  public listGoals(): Observable<ApiHttpResponse<IGoal[]>> {
    if (environment.production) {
      const endpoint: string = createUrl("/goals");
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IGoal[]>>;
    }

    // in the development environment, we should return fake data
    console.debug("/goals");

    return of({
      data: [
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
      ],
      message: "success",
    });
  }

  // GET /goals?q=name
  // gets a list of goal models from a partial name
  public findGoals(searchTerm: string): Observable<ApiHttpResponse<IGoal[]>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals?q=${searchTerm}`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IGoal[]>>;
    }

    console.debug(searchTerm);
    return of({
      data: [
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
        createFakeGoal(),
      ],
      message: "success",
    });
  }

  // GET /goals/:goalId
  public getGoal(goalId: Id): Observable<ApiHttpResponse<IGoal>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals/${goalId}`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IGoal>>;
    }

    console.debug(goalId);
    return of({
      data: createFakeGoal(),
      message: "success",
    });
  }

  // POST /goals
  public createGoal(model: Goal): Observable<ApiHttpResponse<IGoal>> {
    if (environment.production) {
      const endpoint: string = createUrl("/goals");
      return this.http.post(endpoint, model) as Observable<
        ApiHttpResponse<IGoal>
      >;
    }

    console.debug(model);
    return of({
      data: createFakeGoal(),
      message: "success",
    });
  }

  // PUT /goals/:goalId
  public updateGoal(model: Goal): Observable<ApiHttpResponse<IGoal>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals/${model.Id}`);
      return this.http.put(endpoint, model) as Observable<
        ApiHttpResponse<IGoal>
      >;
    }

    console.debug(model);
    return of({
      data: createFakeGoal(),
      message: "success",
    });
  }

  // DELETE /goals/:goalId
  public deleteGoal(goalId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals/${goalId}`);
      return this.http.delete(endpoint) as Observable<EmptyResponse>;
    }

    console.debug(goalId);
    return of(undefined);
  }

  // associations
  public getGoalTasks(goalId: Id): Observable<ApiHttpResponse<ITask[]>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals/${goalId}/tasks`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<ITask[]>>;
    }

    console.debug(goalId);
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

  public getGoalHabits(goalId: Id): Observable<ApiHttpResponse<IHabit[]>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/goals/${goalId}/habits`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IHabit[]>>;
    }

    console.debug(goalId);
    return of({
      data: [
        createFakeHabit(),
        createFakeHabit(),
        createFakeHabit(),
        createFakeHabit(),
        createFakeHabit(),
      ],
      message: "success",
    });
  }
}
