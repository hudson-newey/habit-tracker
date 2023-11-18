import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoalsUpdateComponent } from "./update.component";

describe("UpdateComponent", () => {
  let component: GoalsUpdateComponent;
  let fixture: ComponentFixture<GoalsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalsUpdateComponent],
    });
    fixture = TestBed.createComponent(GoalsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
