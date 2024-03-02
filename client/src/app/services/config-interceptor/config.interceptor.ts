import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ClientConfigService } from "../clientConfig/client-config.service";
import { VirtualDatabaseService } from "../virtualDatabase/virtual-database.service";

// we use the interceptor service to treat local todo items and server todo items differently
@Injectable()
export class ConfigInterceptor implements HttpInterceptor {
  public constructor(
    private config: ClientConfigService,
    private virtualDb: VirtualDatabaseService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.config.isCustomServerUrlSet()) {
      return next.handle(request);
    }

    const data = this.virtualDb.applyApiRequest(request);

    return of(
      new HttpResponse({
        status: 200,
        body: {
          data,
        },
      })
    );
  }
}
