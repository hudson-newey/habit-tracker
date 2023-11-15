import { ILogbook } from "../logbook";

export function createFakeLogbook(): ILogbook {
  return {
    Id: "1",
    Name: "Fake Logbook",
    Description:
      "This is a fake model used in development. Change production = true in the environment.ts to enable communication with the api",
  };
}
