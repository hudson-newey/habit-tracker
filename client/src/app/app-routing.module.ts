import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent as AboutPageComponent } from "src/pages/about/about.component";
import { ContactUsPage } from "src/pages/contact-us/contact-us.component";
import { DayPageComponent } from "src/pages/day/day.component";
import { DeleteGoalPageComponent } from "src/pages/goals/delete/delete.component";
import { GoalsPageComponent } from "src/pages/goals/list/list.component";
import { NewGoalPageComponent } from "src/pages/goals/new/new.component";
import { DeleteHabitPageComponent } from "src/pages/habits/delete/delete.component";
import { HabitShowPageComponent } from "src/pages/habits/habit/show.component";
import { HabitListComponent } from "src/pages/habits/list/list.component";
import { NewHabitPage } from "src/pages/habits/new/new.component";
import { SchedulePageComponent } from "src/pages/schedule/schedule.component";
import { DeleteTaskPageComponent } from "src/pages/tasks/delete/delete.component";
import { TasksPageComponent } from "src/pages/tasks/list/list.component";
import { NewTaskPageComponent } from "src/pages/tasks/new/new.component";
import { TaskPageComponent } from "src/pages/tasks/task/task.component";

const routes: Routes = [
  // goals
  { path: "goals", component: GoalsPageComponent },
  { path: "goals/new", component: NewGoalPageComponent },
  { path: "goals/:id", component: NewGoalPageComponent },
  { path: "goals/:id/delete", component: DeleteGoalPageComponent },
  
  // habits
  { path: "", component: HabitListComponent },
  { path: "habits/new", component: NewHabitPage },
  { path: "habits/:id", component: HabitShowPageComponent },
  { path: "habits/:id/delete", component: DeleteHabitPageComponent },

  // tasks
  { path: "tasks", component: TasksPageComponent },
  { path: "tasks/new", component: NewTaskPageComponent },
  { path: "tasks/:id", component: TaskPageComponent },
  { path: "tasks/:id/delete", component: DeleteTaskPageComponent },

  // general
  { path: "day", component: DayPageComponent },
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
