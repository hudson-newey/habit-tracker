import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "../abstract-service.service";
import { ClientConfigService } from "../clientConfig/client-config.service";
import { PingService } from "../ping/ping.service";
import { Observable, interval, of, take } from "rxjs";
import { VirtualDatabaseService } from "../virtualDatabase/virtual-database.service";
import { createUrl } from "../helpers";

@Injectable({ providedIn: "root" })
export class SyncQueueService extends AbstractService {
  constructor(
    private http: HttpClient,
    private pingService: PingService,
    private config: ClientConfigService,
    private virtualDatabase: VirtualDatabaseService,
  ) {
    super();

    this.timer = interval(10_000);

    this.timer.subscribe(() => {
      this.pingService
        .hasServerConnection()
        .pipe(take(1))
        .subscribe((status) => {
          this.connectionStatus = of(status);

          // attempt to sync the virtual database to the real database every 50 seconds
          // we primarily do this so that we can update the virutal database with the real database
          if (status) {
            if (this.ticksSinceLastSync >= 5 && !this.preferVirtualDb) {
              this.attemptSync();
              this.ticksSinceLastSync = 0;
            } else if (this.preferVirtualDb && this.config.isCustomServerUrlSet()) {
              this.attemptSync();
            }
          }

          this.preferVirtualDb = !status;
          this.ticksSinceLastSync++;
        });
    });
  }

  public connectionStatus: Observable<boolean> = of(false);
  private timer: Observable<number>;
  private preferVirtualDb = true;
  private ticksSinceLastSync = 0;
  private syncQueueLocalStorageKey = "syncQueue";

  public attemptSync(): void {
    // TODO: I'm double querying local storage here
    const syncQueue =
      JSON.parse(localStorage.getItem("syncQueue") as string) ?? [];

    const numberOfItems = syncQueue.length;

    if (numberOfItems === 0) {
      this.syncFromDatabase();
      return;
    }

    if (!this.shouldFlushSyncQueue()) {
      return;
    }

    syncQueue.forEach((request: HttpRequest<unknown>, i: number) => {
      const method = request.method;
      const body = request.body;
      const url = createUrl(request.url);

      const requestMethodImplementation: () => Observable<unknown> = () => {
        switch (method) {
          case "GET":
            return this.http.get(url);
          case "POST":
            return this.http.post(url, body);
          case "PUT":
            return this.http.put(url, body);
          case "DELETE":
            return this.http.delete(url);
          default:
            return of(null);
        }
      }

      requestMethodImplementation().subscribe(() => {
        // remove the item from local storage
        // I do this so that if one request fails, it won't be removed from the queue
        const index = syncQueue.indexOf(request);
        syncQueue.splice(index, 1);
        localStorage.setItem(
          this.syncQueueLocalStorageKey,
          JSON.stringify(syncQueue),
        );

        // after the last item is removed, we should attempt to sync the virtual database
        // with the real database
        if (i === numberOfItems - 1) {
          this.syncFromDatabase();
        }
      });
    });
  }

  public syncFromDatabase(): void {
    if (!this.config.isCustomServerUrlSet()) {
      return;
    }

    const virtualTables = this.virtualDatabase.knownVirtualTables();

    virtualTables.forEach((table) => {
      const url = createUrl(`/${table}`);
      this.http.get(url).subscribe((response) => {
        this.virtualDatabase.updateTable(table, JSON.stringify(response));
      });
    });
  }

  public shouldFlushSyncQueue(): boolean {
    const syncQueue =
      JSON.parse(localStorage.getItem("syncQueue") as string) ?? [];
    const hasRealServer = this.config.isCustomServerUrlSet();
    const hasInternetConnection = navigator.onLine;

    return syncQueue.length > 0 && hasRealServer && hasInternetConnection;
  }
}
