import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutPageComponent } from "./pages/about/about.component";
import { ContactUsPageComponent } from "./pages/contact-us/contact-us.component";
import { DayPageComponent } from "./pages/day/day.component";
import { DeleteGoalPageComponent } from "./pages/goals/delete/delete.component";
import { GoalPageComponent } from "./pages/goals/goal/show.component";
import { GoalsPageComponent } from "./pages/goals/list/list.component";
import { NewGoalPageComponent } from "./pages/goals/new/new.component";
import { DeleteHabitPageComponent } from "./pages/habits/delete/delete.component";
import { HabitShowPageComponent } from "./pages/habits/habit/show.component";
import { HabitListComponent } from "./pages/habits/list/list.component";
import { NewHabitPage } from "./pages/habits/new/new.component";
import { HelpPageComponent } from "./pages/help/help.component";
import { SchedulePageComponent } from "./pages/schedule/schedule.component";
import { DeleteTaskPageComponent } from "./pages/tasks/delete/delete.component";
import { TasksPageComponent } from "./pages/tasks/list/list.component";
import { NewTaskPageComponent } from "./pages/tasks/new/new.component";
import { TaskPageComponent } from "./pages/tasks/task/show.component";

const routes: Routes = [
  // goals
  { path: "goals", component: GoalsPageComponent },
  { path: "goals/new", component: NewGoalPageComponent },
  { path: "goals/:id", component: GoalPageComponent },
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
  { path: "contact-us", component: ContactUsPageComponent },
  { path: "help", component: HelpPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
