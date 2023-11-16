import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface ILogbook {
    Id?: Id;
    Name?: string;
    Description?: string;
}

export class Logbook extends AbstractModel<ILogbook> {
    public constructor(data: ILogbook) {
        super(data);
    }

    public Id!: Id;
    public Name!: string;
    public Description!: string;
}
