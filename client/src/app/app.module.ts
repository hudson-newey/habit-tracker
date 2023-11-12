import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HabitComponent } from "src/components/habit/habit.component";
import { NavbarComponent } from "src/components/navbar/navbar.component";
import { HabitService } from "src/services/habits.service";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HabitListComponent } from "src/pages/habits/list/list.component";
import { NewHabitPage } from "src/pages/habits/new/new.component";
import { TasksService } from "src/services/tasks.service";
import { GoalsService } from "src/services/goals.service";

const pages: any[] = [HabitListComponent, HabitComponent, NewHabitPage];

const services: any[] = [HabitService, GoalsService, TasksService];

const components: any[] = [NavbarComponent];

@NgModule({
  declarations: [AppComponent, ...components, ...pages],
  imports: [CommonModule, BrowserModule, AppRoutingModule],
  providers: [HttpClient, HttpHandler, HttpBackend, ...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
