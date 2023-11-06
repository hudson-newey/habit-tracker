import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HabitComponent } from 'src/components/habit/habit.component';

const components: any[] = [
  HabitComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
