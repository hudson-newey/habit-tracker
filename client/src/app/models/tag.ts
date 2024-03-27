import { Id } from "../types/helpers";
import { AbstractModel } from "./abstractModel";

export interface ITag {
  Id?: Id;
  Text?: string;
  Color?: string;
}

export class Tag extends AbstractModel<ITag> implements ITag {
  public constructor(data: ITag) {
    super(data);
  }

  public Id!: Id;
  public Text!: string;
  public Color!: string;
}
