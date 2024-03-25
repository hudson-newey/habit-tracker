import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeleteGoalPageComponent } from "./pages/goals/delete/delete.component";
import { GoalPageComponent } from "./pages/goals/goal/show.component";
import { GoalsPageComponent } from "./pages/goals/list/list.component";
import { NewGoalPageComponent } from "./pages/goals/new/new.component";
import { DeleteHabitPageComponent } from "./pages/habits/delete/delete.component";
import { HabitShowPageComponent } from "./pages/habits/habit/show.component";
import { HabitListComponent } from "./pages/habits/list/list.component";
import { NewHabitPage } from "./pages/habits/new/new.component";
import { SchedulePageComponent } from "./pages/schedule/schedule.component";
import { DeleteTaskPageComponent } from "./pages/tasks/delete/delete.component";
import { TasksPageComponent } from "./pages/tasks/list/list.component";
import { NewTaskPageComponent } from "./pages/tasks/new/new.component";
import { TaskPageComponent } from "./pages/tasks/task/show.component";
import { LogbookListComponent } from "./pages/logbook/list/list.component";
import { LogbookNewComponent } from "./pages/logbook/new/new.component";
import { LogbookShowComponent } from "./pages/logbook/show/show.component";
import { LogbookDeleteComponent } from "./pages/logbook/delete/delete.component";
import { GoalsUpdateComponent } from "./pages/goals/update/update.component";
import { HabitsUpdateComponent } from "./pages/habits/update/update.component";
import { TasksUpdateComponent } from "./pages/tasks/update/update.component";
import { ConfigurePageComponent } from "./pages/configure/configure.component";
import { LogbookEditComponent } from "./pages/logbook/edit/edit.component";

const routes: Routes = [
  // goals
  { path: "goals", component: GoalsPageComponent },
  { path: "goals/new", component: NewGoalPageComponent },
  { path: "goals/:id", component: GoalPageComponent },
  { path: "goals/:id/delete", component: DeleteGoalPageComponent },
  { path: "goals/:id/edit", component: GoalsUpdateComponent },

  // habits
  { path: "", component: HabitListComponent },
  { path: "habits/new", component: NewHabitPage },
  { path: "habits/:id", component: HabitShowPageComponent },
  { path: "habits/:id/delete", component: DeleteHabitPageComponent },
  { path: "habits/:id/edit", component: HabitsUpdateComponent },

  // tasks
  { path: "tasks", component: TasksPageComponent },
  { path: "tasks/new", component: NewTaskPageComponent },
  { path: "tasks/:id", component: TaskPageComponent },
  { path: "tasks/:id/delete", component: DeleteTaskPageComponent },
  { path: "tasks/:id/edit", component: TasksUpdateComponent },

  // logbook
  { path: "logbook", component: LogbookListComponent },
  { path: "logbook/new", component: LogbookNewComponent },
  { path: "logbook/:id", component: LogbookShowComponent },
  { path: "logbook/:id/delete", component: LogbookDeleteComponent },
  { path: "logbook/:id/edit", component: LogbookEditComponent },

  // general
  { path: "schedule", component: SchedulePageComponent },
  { path: "configure", component: ConfigurePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
