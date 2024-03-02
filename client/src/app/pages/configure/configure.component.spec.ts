import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfigurePageComponent } from "./configure.component";

describe("ConfigureComponent", () => {
  let component: ConfigurePageComponent;
  let fixture: ComponentFixture<ConfigurePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurePageComponent],
    });
    fixture = TestBed.createComponent(ConfigurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
