import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface ILogbook {
    Id?: Id;
    Name?: string;
    Content?: string;
}

export class Logbook extends AbstractModel<ILogbook> {
    public constructor(data: ILogbook) {
        super(data);
    }

    public Id!: Id;
    public Name!: string;
    public Content!: string;

    public override get ViewUrl(): any[] {
        return ["/logbook", this.Id];
    }
}
