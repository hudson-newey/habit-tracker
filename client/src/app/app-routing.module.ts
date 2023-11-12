import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent as AboutPageComponent } from "src/pages/about/about.component";
import { ContactUsPage } from "src/pages/contact-us/contact-us.component";
import { DayPageComponent } from "src/pages/day/day.component";
import { DeleteHabitPageComponent } from "src/pages/habits/delete/delete.component";
import { HabitShowPageComponent } from "src/pages/habits/habit/show.component";
import { HabitListComponent } from "src/pages/habits/list/list.component";
import { NewHabitPage } from "src/pages/habits/new/new.component";
import { SchedulePageComponent } from "src/pages/schedule/schedule.component";
import { TasksPageComponent } from "src/pages/tasks/list/tasks.component";

const routes: Routes = [
  // goals
  
  // habits
  { path: "", component: HabitListComponent },
  { path: "new", component: NewHabitPage },
  { path: "habits/:id", component: HabitShowPageComponent },
  { path: "habits/:id/delete", component: DeleteHabitPageComponent },

  // tasks

  // general
  { path: "day", component: DayPageComponent },
  { path: "tasks", component: TasksPageComponent },
  { path: "schedule", component: SchedulePageComponent },

  // site
  { path: "about", component: AboutPageComponent },
  { path: "contact-us", component: ContactUsPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
