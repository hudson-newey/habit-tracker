import { Component } from "@angular/core";

@Component({
  selector: "app-new-page",
  template: `<app-habit-form [creating]="true"></app-habit-form>`,
})
export class NewHabitPage { }
