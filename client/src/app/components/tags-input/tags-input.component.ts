import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Tag } from "src/app/models/tag";
import { TagsService } from "src/app/services/tags/tags.service";
import { Id } from "src/app/types/helpers";

@Component({
  selector: "app-tags-input",
  templateUrl: "./tags-input.component.html",
  styleUrl: "./tags-input.component.less",
})
export class TagsInputComponent implements OnInit {
  public constructor(private api: TagsService) {
    this.model ??= [];
  }

  @Input()
  public model?: Id[];
  @Output()
  public modelChange = new EventEmitter<Id[]>()

  protected selectedTags: (Tag | undefined)[] = [];
  protected possibleTags: Tag[] = [];
  protected searchResults: Tag[] = [];

  public ngOnInit(): void {
    this.api.getTags().subscribe((tags) => {
      this.possibleTags = tags.map((model) => new Tag(model));
    });

    // TODO: remove this "as any"
    this.selectedTags = this.model?.map((id) => this.possibleTags.find((tag) => tag?.Id === id)) as any;
  }

  protected addTag(tag: Tag): void {
    this.selectedTags.push(tag);
    this.model!.push(tag.Id);
    this.modelChange.emit(this.model);
  }

  protected removeTag(tag: Tag): void {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    this.model = this.model!.filter((id) => id !== tag.Id);
    this.modelChange.emit(this.model);
  }

  protected searchTags(event: any): void {
    const query = event.target.value;

    this.searchResults = this.possibleTags.filter((tag) => tag.Text.toLowerCase().includes(query.toLowerCase()));
  }
}
