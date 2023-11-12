import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service.service";

@Injectable({ providedIn: "root" })
export class GoalService extends AbstractService {
  public constructor() {
    super();
  }
}
