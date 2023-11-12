import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent as AboutPageComponent } from "src/pages/about/about.component";
import { DayPageComponent } from "src/pages/day/day.component";
import { HabitListComponent } from "src/pages/habits/list/list.component";
import { NewHabitPage } from "src/pages/habits/new/new.component";
import { SchedulePageComponent } from "src/pages/schedule/schedule.component";
import { TasksPageComponent } from "src/pages/tasks/list/tasks.component";

const routes: Routes = [
  { path: "about", component: AboutPageComponent },
  { path: "new", component: NewHabitPage },
  { path: "day", component: DayPageComponent },
  { path: "tasks", component: TasksPageComponent },
  { path: "schedule", component: SchedulePageComponent },
  { path: "", component: HabitListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
