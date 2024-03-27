import { Injectable } from "@angular/core";
import { AbstractService } from "../abstract-service.service";
import { Observable } from "rxjs";
import { ITag } from "src/app/models/tag";
import { createUrl } from "../helpers";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TagsService extends AbstractService {
  public constructor(public http: HttpClient) {
    super();
  }

  public getTags(): Observable<ITag[]> {
    const endpoint: string = createUrl("/tags");
    return this.http.get<ITag[]>(endpoint);
  }
}
