import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent as AboutPageComponent } from "src/pages/about/about.component";
import { DayPageComponent } from "src/pages/day/day.component";
import { ListComponent as HabitListComponent } from "src/pages/habits/list.component";
import { NewComponent as NewHabitPageComponent } from "src/pages/newHabit/new.component";
import { SchedulePageComponent } from "src/pages/schedule/schedule.component";
import { TaskPageComponent } from "src/pages/task/task.component";

const routes: Routes = [
  { path: "about", component: AboutPageComponent },
  { path: "new", component: NewHabitPageComponent },
  { path: "day", component: DayPageComponent },
  { path: "tasks", component: TaskPageComponent },
  { path: "schedule", component: SchedulePageComponent },
  { path: "", component: HabitListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
