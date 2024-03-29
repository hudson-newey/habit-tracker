import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { ILogbook, Logbook } from "src/app/models/logbook";
import { LogbookService } from "src/app/services/logbook/logbook.service";
import { NgFor, DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.less"],
    standalone: true,
    imports: [
        RouterLink,
        NgFor,
        DatePipe,
    ],
})
export class LogbookListComponent implements OnInit {
  public constructor(private api: LogbookService) {}

  protected logbooks: Logbook[] = [];

  public ngOnInit(): void {
    this.api
      .getLogbooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.logbooks = response.data.map((model: ILogbook) => new Logbook(model));
      });
  }
}
