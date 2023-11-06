import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HabitComponent } from "src/components/habit/habit.component";
import { NavbarComponent } from "src/components/navbar/navbar.component";
import { HabitService } from "src/services/habits.service";

const components: any[] = [HabitComponent, NavbarComponent];

const services: any[] = [HabitService];

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [BrowserModule, AppRoutingModule],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
