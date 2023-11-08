import { Habit } from "../habit";

export function createFakeHabit(): Habit {
  return new Habit({
    Id: 1,
    Name: "Fake Habit",
    Description:
      "This is a fake model used in development. Change production = true in the environment.ts to enable communication with the api",
  });
}
