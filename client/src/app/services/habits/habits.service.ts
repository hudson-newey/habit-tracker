import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Observable, of } from "rxjs";
import { AbstractService } from "../abstract-service.service";
import { createUrl } from "../helpers";
import { createFakeHabit } from "../../models/fakes/habit.fake";
import { IHabit, Habit } from "../../models/habit";
import { Id } from "../../types/helpers";
import { ApiHttpResponse, EmptyResponse } from "../../types/services";

@Injectable({ providedIn: "root" })
export class HabitsService extends AbstractService {
  public constructor(public http: HttpClient) {
    super();
  }

  // GET /habits
  public getHabits(): Observable<ApiHttpResponse<IHabit[]>> {
    if (environment.production) {
      const endpoint: string = createUrl("/habits");
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IHabit[]>>;
    }

    // in the development environment, we should return fake data
    console.debug("/habits");

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

  // GET /habits/:habitId
  public getHabit(habitId: Id): Observable<ApiHttpResponse<IHabit>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/habits/${habitId}`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<IHabit>>;
    }

    console.debug(habitId);
    return of({
      data: createFakeHabit(),
      message: "success",
    });
  }

  // POST /habits
  public createHabit(model: Habit): Observable<ApiHttpResponse<IHabit>> {
    if (environment.production) {
      const endpoint: string = createUrl("/habits");
      return this.http.post(endpoint, model) as Observable<
        ApiHttpResponse<IHabit>
      >;
    }

    console.debug(model);
    return of({
      data: createFakeHabit(),
      message: "success",
    });
  }

  // PUT /habits/:habitId
  public updateHabit(model: Habit): Observable<ApiHttpResponse<IHabit>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/habits/${model.Id}`);
      return this.http.put(endpoint, model) as Observable<
        ApiHttpResponse<IHabit>
      >;
    }

    console.debug(model);
    return of({
      data: createFakeHabit(),
      message: "success",
    });
  }

  // DELETE /habits/:habitId
  public deleteHabit(modelId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/habits/${modelId}`);
      return this.http.delete(endpoint);
    }

    console.debug(modelId);
    return of(undefined);
  }
}
