import { environment } from "src/environment";

export function createUrl(path: string): string {
  return environment.endpoint + path;
}
