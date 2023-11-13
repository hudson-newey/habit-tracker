import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service.service";
import { environment } from "src/environment";
import { createUrl } from "./helpers";
import { HttpClient } from "@angular/common/http";
import { Goal, IGoal } from "src/models/goal";
import { Observable, of } from "rxjs";
import { createFakeGoal } from "src/models/fakes/goal.fake";
import { Id } from "src/types/helpers";
import { ApiHttpResponse, EmptyResponse } from "src/types/services";

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
}
