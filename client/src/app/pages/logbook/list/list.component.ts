import { Component, OnInit } from "@angular/core";
import { take } from "rxjs";
import { ILogbook, Logbook } from "src/app/models/logbook";
import { LogbookService } from "src/app/services/logbook/logbook.service";
import { NgFor, DatePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { VirtualDatabaseService } from "src/app/services/virtualDatabase/virtual-database.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"],
  standalone: true,
  imports: [RouterLink, NgFor, DatePipe],
})
export class LogbookListComponent implements OnInit {
  public constructor(
    private api: LogbookService,
    private virtualDb: VirtualDatabaseService,
  ) {}

  protected logbooks: Logbook[] = [];

  public ngOnInit(): void {
    this.updateLogbooks();

    this.virtualDb.changeNotifier.addEventListener("change", () =>
      this.updateLogbooks(),
    );
  }

  public updateLogbooks(): void {
    this.api
      .getLogbooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.logbooks = response.data
          .map((model: ILogbook) => new Logbook(model))
          .sort(this.logbookSorter);
      });
  }

  // sorts logbooks in decending order (so that the most recentl created)
  // logbook is at the top of the list
  private logbookSorter(a: Logbook, b: Logbook): number {
    // TODO: this should use the CreatedAt property
    const aCreated = a.Id ?? a.ClientId;
    const bCreated = b.Id ?? b.ClientId;

    if (aCreated > bCreated) {
      return -1;
    } else if (aCreated < bCreated) {
      return 1;
    }

    // through domain exhaustion, we know that both values must be equal
    // if (aCreated === bCreated)
    return 0;
  }
}
