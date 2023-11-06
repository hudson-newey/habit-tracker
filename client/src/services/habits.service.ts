import { Injectable } from "@angular/core";
import { Id } from "src/types/helpers";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";

function createUrl(path: string): string {
  return environment.endpoint + path;
}

@Injectable({ providedIn: "root" })
export class HabitService {
  public constructor() {}

  // GET /habits
  public async getHabits() {
  }

  // GET /habits/:habitId
  public getHabit(habitId: Id) {}

  // POST /habits
  public createHabit() {}

  // PUT /habits/:habitId
  public updateHabit() {}

  // DELETE /habits/:habitId
  public deleteHabit() {}
}
