import { Directive, Input } from "@angular/core";

export interface IAbstractFormComponent<T> {
  creating: boolean;
  model?: T;
}

@Directive({ selector: "app-abstract-form" })
export abstract class AbstractFormComponent<T extends object>
  implements IAbstractFormComponent<T>
{
  public constructor() {}

  @Input({ required: true }) public creating!: boolean;
  @Input({ required: false }) public model: T = {} as T;
}
