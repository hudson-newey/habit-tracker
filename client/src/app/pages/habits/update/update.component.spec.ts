import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HabitsUpdateComponent } from "./update.component";

describe("UpdateComponent", () => {
  let component: HabitsUpdateComponent;
  let fixture: ComponentFixture<HabitsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitsUpdateComponent],
    });
    fixture = TestBed.createComponent(HabitsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
