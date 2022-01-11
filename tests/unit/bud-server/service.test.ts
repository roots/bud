import {Bud, factory} from "../../util/bud";

describe("@roots/bud-server", function () {
  let bud: Bud;

  beforeAll(async () => {
    bud = await factory({ config: { mode: "development" } });
  });

  it("has expected defaults", () => {
    expect(bud.store.get("server")).toMatchSnapshot({
      browser: {
        indicator: true,
        log: true,
        overlay: true,
      },
      middleware: {
        dev: true,
        hot: true,
        proxy: false,
      },
      dev: {
        url: new URL("http://localhost:3000/"),
      },
      proxy: {
        url: new URL("http://localhost/"),
      },

      watch: {
        files: [],
      },
    });
  });

  it("is modifiable", () => {
    expect(bud.store.get("server.browser.indicator")).toBe(true);
    bud.store.set("server.browser.indicator", false);
    expect(bud.store.get("server.browser.indicator")).toBe(false);
  });

  it("has run method", () => {
    expect(bud.server.run).toBeInstanceOf(Function);
  });
});
