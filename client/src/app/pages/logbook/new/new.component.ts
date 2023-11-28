import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ILogbook, Logbook } from "src/app/models/logbook";
import { LogbookService } from "src/app/services/logbook/logbook.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.less"],
})
export class LogbookNewComponent {
  public constructor(
    private router: Router,
    private api: LogbookService,
  ) {}

  protected model: ILogbook = {
    CreatedAt: new Date().toLocaleDateString(),
  };

  protected submitForm(): void {
    const logbookModel: Logbook = new Logbook(this.model);
    
    this.api
      .createLogbook(logbookModel)
      .subscribe(() => this.router.navigateByUrl("/logbook"));
  }
}
