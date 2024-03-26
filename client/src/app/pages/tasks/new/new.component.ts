import { Component } from "@angular/core";

@Component({
  selector: "app-new-task-page",
  template: `<app-task-form [creating]="true"></app-task-form>`,
})
export class NewTaskPageComponent {}
