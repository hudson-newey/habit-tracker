import { Injectable } from "@angular/core";
import { Id } from "src/types/helpers";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Observable, of } from "rxjs";
import { AbstractService } from "./abstract-service.service";
import { Habit } from "src/models/habit";
import { createFakeHabit } from "src/models/fakes/habit.fake";
import { EmptyResponse } from "src/types/services";

function createUrl(path: string): string {
  return environment.endpoint + path;
}

@Injectable({ providedIn: "root" })
export class HabitService extends AbstractService {
  public constructor(
    public http: HttpClient,
  ) {
    super();
  }

  // GET /habits
  public getHabits(): Observable<Habit[]> {
    if (environment.production) {
      const endpoint: string = createUrl("/habits");
      return this.http.get(endpoint) as Observable<Habit[]>;
    }

    // in the development environment, we should return fake data
    return of([
      createFakeHabit(),
      createFakeHabit(),
      createFakeHabit(),
      createFakeHabit(),
      createFakeHabit(),
    ]);
  }

  // GET /habits/:habitId
  public getHabit(habitId: Id) {
    if (environment.production) {
      const endpoint: string = createUrl(`/habits/${habitId}`);
      return this.http.get(endpoint) as Observable<Habit>;
    }

    return of(createFakeHabit());
  }

  // POST /habits
  public createHabit(model: Habit) {
    if (environment.production) {
      const endpoint: string = createUrl("/habits");
      return this.http.post(endpoint, model) as Observable<Habit>;
    }

    return of(createFakeHabit());
  }

  // PUT /habits/:habitId
  public updateHabit(model: Habit) {
    if (environment.production) {
      const endpoint: string = createUrl("/habits");
      return this.http.put(endpoint, model) as Observable<Habit>;
    }

    return of(createFakeHabit());
  }

  // DELETE /habits/:habitId
  public deleteHabit(modelId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/habits/${modelId}`);
      return this.http.delete(endpoint);
    }
    
    return of();
  }
}
