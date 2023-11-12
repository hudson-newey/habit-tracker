import { Task } from "../task"

export function createFakeTask(): Task {
    return new Task({
        Id: 1,
        Name: "Fake Task",
        Description: "This is a fake model used in development. Change production = true in the environment.ts to enable communication with the api",
    });
}
