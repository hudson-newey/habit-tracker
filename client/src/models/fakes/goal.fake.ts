import { Goal } from "../goal";

export function createFakeGoal(): Goal {
    return new Goal({
        Id: 1,
        Name: "Fake Goal",
        Description: "This is a fake model used in development. Change production = true in the environment.ts to enable communication with the api",
    });
}
