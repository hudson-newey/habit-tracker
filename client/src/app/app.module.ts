import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HabitComponent } from "src/components/habit/habit.component";
import { NavbarComponent } from "src/components/navbar/navbar.component";
import { HabitService } from "src/services/habits.service";
import { HttpBackend, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HabitListComponent } from "src/pages/habits/list/list.component";
import { NewHabitPage } from "src/pages/habits/new/new.component";
import { TasksService } from "src/services/tasks.service";
import { GoalsService } from "src/services/goals.service";
import { FormsModule } from "@angular/forms";
import { HabitShowPageComponent } from "src/pages/habits/habit/show.component";
import { GoalsPageComponent } from "src/pages/goals/list/list.component";
import { NewGoalPageComponent } from "src/pages/goals/new/new.component";
import { DeleteGoalPageComponent } from "src/pages/goals/delete/delete.component";
import { TasksPageComponent } from "src/pages/tasks/list/list.component";
import { NewTaskPageComponent } from "src/pages/tasks/new/new.component";
import { DeleteTaskPageComponent } from "src/pages/tasks/delete/delete.component";
import { DayPageComponent } from "src/pages/day/day.component";
import { SchedulePageComponent } from "src/pages/schedule/schedule.component";
import { AboutPageComponent } from "src/pages/about/about.component";
import { ContactUsPageComponent } from "src/pages/contact-us/contact-us.component";
import { TaskPageComponent } from "src/pages/tasks/task/show.component";
import { GoalPageComponent } from "src/pages/goals/goal/show.component";

const pages: any[] = [
  // goals
  GoalsPageComponent,
  NewGoalPageComponent,
  GoalPageComponent,
  DeleteGoalPageComponent,
  
  // habits
  HabitListComponent,
  HabitComponent,
  NewHabitPage,
  HabitShowPageComponent,

  // tasks
  TasksPageComponent,
  NewTaskPageComponent,
  TaskPageComponent,
  DeleteTaskPageComponent,

  // general
  DayPageComponent,
  SchedulePageComponent,

  // site
  AboutPageComponent,
  ContactUsPageComponent,
];

const services: any[] = [HabitService, GoalsService, TasksService];

const components: any[] = [NavbarComponent];

@NgModule({
  declarations: [AppComponent, ...components, ...pages],
  imports: [CommonModule, BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
