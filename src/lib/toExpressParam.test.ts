import toExpressParam from "./toExpressParam";

describe("toExpressParam", () => {
  it("replaces matches", () => {
    const path = "/path/to/{param}";
    const sut = toExpressParam(path);
    expect(sut).toEqual("/path/to/:param");
  });

  it("replaces multiple matches", () => {
    const path = "/path/to/{param}/and/{param2}";
    const sut = toExpressParam(path);
    expect(sut).toEqual("/path/to/:param/and/:param2");
  });
});
