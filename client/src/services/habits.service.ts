import { Injectable } from "@angular/core";
import { Id } from "src/types/helpers";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Observable, of } from "rxjs";
import { AbstractService } from "./abstract-service.service";
import { Habit, IHabit } from "src/models/habit";
import { createFakeHabit } from "src/models/fakes/habit.fake";
import { ApiHttpResponse, EmptyResponse } from "src/types/services";
import { createUrl } from "./helpers";

@Injectable({ providedIn: "root" })
export class HabitService extends AbstractService {
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
      const endpoint: string = createUrl("/habits");
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
