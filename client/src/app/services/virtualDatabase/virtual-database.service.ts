import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "../abstract-service.service";

@Injectable({ providedIn: "root" })
export class VirtualDatabaseService extends AbstractService {
  public constructor() {
    super();
  }

  public applyApiRequest(request: HttpRequest<unknown>): any {
    const virtualTableName = request.url.split("/")[1];
    const id = Number(request.url.split("/")[2]);
    const newContent = request.body;

    if (localStorage.getItem(virtualTableName) === null) {
      localStorage.setItem(virtualTableName, "[]");
    }

    const virtualTable = this.tableValue(virtualTableName);

    if (request.method === "GET") {
      if (id) {
        // TODO: this is not correct server side (should be under the habits/task routes)
        // because there is a route /goals/:id/habits and /goals/:id/tasks to get the
        // habits and tasks associated with a goal
        // we need to make a special case in the virtual database to handle this
        if (virtualTableName === "goals" && request.url.split("/").length > 3) {
          const associatedTableName = request.url.split("/")[3];

          const value = this.tableValue(associatedTableName).filter(
            (model: any) => model.Goal = id,
          );

          console.log(value);

          return value;
        }

        return virtualTable.find((item: any) => item.Id === id);
      }
    }

    if (request.method === "POST") {
      const newContentObject = JSON.parse(JSON.stringify(newContent));

      // because id's are auto incremented by mongo, we replicate that here
      newContentObject.Id = this.nextTableId(virtualTableName);
      virtualTable.push(newContentObject);

      localStorage.setItem(virtualTableName, JSON.stringify(virtualTable));
    }

    if (request.method === "DELETE") {
      const index = virtualTable.findIndex((item: any) => item.Id === id);

      virtualTable.splice(index, 1);

      localStorage.setItem(virtualTableName, JSON.stringify(virtualTable));
    }

    if (request.method === "PUT") {
      const index = virtualTable.findIndex((item: any) => item.Id === id);

      virtualTable[index] = newContent;

      localStorage.setItem(virtualTableName, JSON.stringify(virtualTable));
    }

    const tableValue = this.tableValue(virtualTableName);
    return tableValue;
  }

  private tableValue(tableName: string): unknown[] {
    return JSON.parse(localStorage.getItem(tableName) as string) ?? [];
  }

  private nextTableId(tableName: string): number {
    const table = this.tableValue(tableName);

    if (table.length === 0) {
      return 1;
    }

    return Math.max(...table.map((item: any) => item.Id)) + 1;
  }
}
