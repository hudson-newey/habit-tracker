import { Component } from "@angular/core";

@Component({
  selector: "app-new-goal-page",
  template: `<app-goal-form [creating]="true"></app-goal-form>`,
})
export class NewGoalPageComponent { }
