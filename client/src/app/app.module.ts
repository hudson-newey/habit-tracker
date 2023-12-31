// ts-ignore
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, isDevMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AboutPageComponent } from "./pages/about/about.component";
import { ContactUsPageComponent } from "./pages/contact-us/contact-us.component";
import { DeleteGoalPageComponent } from "./pages/goals/delete/delete.component";
import { GoalPageComponent } from "./pages/goals/goal/show.component";
import { GoalsPageComponent } from "./pages/goals/list/list.component";
import { NewGoalPageComponent } from "./pages/goals/new/new.component";
import { HabitShowPageComponent } from "./pages/habits/habit/show.component";
import { HabitListComponent } from "./pages/habits/list/list.component";
import { NewHabitPage } from "./pages/habits/new/new.component";
import { SchedulePageComponent } from "./pages/schedule/schedule.component";
import { DeleteTaskPageComponent } from "./pages/tasks/delete/delete.component";
import { TasksPageComponent } from "./pages/tasks/list/list.component";
import { NewTaskPageComponent } from "./pages/tasks/new/new.component";
import { TaskPageComponent } from "./pages/tasks/task/show.component";
import { GoalsService } from "./services/goals/goals.service";
import { HabitsService } from "./services/habits/habits.service";
import { TasksService } from "./services/tasks/tasks.service";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { LogbookShowComponent } from "./pages/logbook/show/show.component";
import { LogbookDeleteComponent } from "./pages/logbook/delete/delete.component";
import { LogbookNewComponent } from "./pages/logbook/new/new.component";
import { LogbookListComponent } from "./pages/logbook/list/list.component";
import { TasksUpdateComponent } from './pages/tasks/update/update.component';
import { DeleteHabitPageComponent } from "./pages/habits/delete/delete.component";
import { HabitsUpdateComponent } from "./pages/habits/update/update.component";
import { GoalsUpdateComponent } from "./pages/goals/update/update.component";
import { CalendarHeatmapComponent } from './components/calendar-heatmap/calendar-heatmap.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const pages: any[] = [
  // goals
  GoalsPageComponent,
  NewGoalPageComponent,
  GoalPageComponent,
  DeleteGoalPageComponent,
  GoalsUpdateComponent,

  // habits
  HabitListComponent,
  NewHabitPage,
  HabitShowPageComponent,
  DeleteHabitPageComponent,
  HabitsUpdateComponent,

  // tasks
  TasksPageComponent,
  NewTaskPageComponent,
  TaskPageComponent,
  DeleteTaskPageComponent,
  TasksUpdateComponent,

  // logbook
  LogbookListComponent,
  LogbookNewComponent,
  LogbookShowComponent,
  LogbookDeleteComponent,

  // general
  SchedulePageComponent,

  // site
  AboutPageComponent,
  ContactUsPageComponent,
  RegisterComponent,
  LoginComponent,
];

const services: any[] = [HabitsService, GoalsService, TasksService];

const components: any[] = [NavbarComponent, CalendarHeatmapComponent];

@NgModule({
  declarations: [AppComponent, ...components, ...pages],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
