import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service.service";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ApiHttpResponse, EmptyResponse } from "src/types/services";
import { ILogbook, Logbook } from "src/models/logbook";
import { environment } from "src/environment";
import { createUrl } from "./helpers";
import { createFakeLogbook } from "src/models/fakes/logbook.fake";
import { Id } from "src/types/helpers";

@Injectable({ providedIn: "root" })
export class LogbookService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  // GET /logbooks
  public getLogbooks(): Observable<ApiHttpResponse<ILogbook[]>> {
    if (environment.production) {
        const endpoint: string = createUrl("/logbooks");
        return this.http.get(endpoint) as Observable<ApiHttpResponse<ILogbook[]>>;
    }
    
    console.debug("/logbook");
    return of({
        data: [
            createFakeLogbook(),
            createFakeLogbook(),
            createFakeLogbook(),
            createFakeLogbook(),
            createFakeLogbook(),
        ],
        message: "success",
    });
  }

  // GET /logbooks/:logbookId
  public getLogbook(logbookId: Id): Observable<ApiHttpResponse<ILogbook>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/logbooks/${logbookId}`);
      return this.http.get(endpoint) as Observable<ApiHttpResponse<ILogbook>>
    }

    console.debug(logbookId);
    return of({
      data: createFakeLogbook(),
      message: "success",
    });
  }

  // POST /logbooks
  public createLogbook(model: Logbook): Observable<ApiHttpResponse<ILogbook>> {
    if (environment.production) {
      const endpoint: string = createUrl("/logbooks");
      return this.http.post(endpoint, model) as Observable<ApiHttpResponse<ILogbook>>
    }

    console.debug(model);
    return of({
      data: createFakeLogbook(),
      message: "success",
    });
  }

  // PUT /logbooks/:logbookId
  public updateLogbook(model: Logbook): Observable<ApiHttpResponse<ILogbook>> {
    if (environment.production) {
      const endpoint: string = createUrl(`/logbooks/${model.Id}`);
      return this.http.put(endpoint, model) as Observable<ApiHttpResponse<ILogbook>>
    }

    console.debug(model);
    return of({
      data: createFakeLogbook(),
      message: "success",
    });
  }

  // DELETE /logbooks/:logbookId
  public deleteLogbook(logbookId: Id): Observable<EmptyResponse> {
    if (environment.production) {
      const endpoint: string = createUrl(`/logbooks/${logbookId}`);
      return this.http.delete(endpoint) as Observable<EmptyResponse>
    }

    console.debug(logbookId);
    return of(undefined);
  }
}
