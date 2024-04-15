import { Injectable } from "@angular/core";
import { AbstractService } from "../abstract-service.service";
import { ApiHttpResponse } from "src/app/types/services";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";
import { createUrl } from "../helpers";

@Injectable({ providedIn: "root" })
export class PingService extends AbstractService {
  public constructor(public http: HttpClient) {
    super();
  }

  public pingServer(): Observable<ApiHttpResponse<string>> {
    let endpoint = createUrl("/ping");
    return this.http.get<ApiHttpResponse<string>>(endpoint);
  }

  public hasServerConnection(): Observable<boolean> {
    if (!navigator.onLine) {
      return of(false);
    }

    return this.pingServer()
      .pipe(
        map((response) => {
          return response.message === "Success";
        }),
      )
      .pipe(
        catchError(() => {
          return of(false);
        }),
      );
  }
}
