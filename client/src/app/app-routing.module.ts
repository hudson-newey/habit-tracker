import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "src/pages/about/about.component";
import { ListComponent } from "src/pages/list/list.component";
import { NewComponent } from "src/pages/new/new.component";

const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "new", component: NewComponent },
  { path: "", component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
