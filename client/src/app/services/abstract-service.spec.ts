import { AbstractService } from "./abstract-service.service";

describe("AbstractService", () => {
  it("should create", () => {
    const service = new TestAbstractService();
    expect(service).toBeTruthy();
  });
});

class TestAbstractService extends AbstractService {
  public constructor() {
    super();
  }
}
