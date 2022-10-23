/* eslint-disable no-console */
import { describe, expect, it } from "@jest/globals";
import { execa } from "execa";

describe(`@roots/bud-sass`, () => {
  it(`should not throw in development`, async () => {
    try {
      await execa(`yarn`, [
        `workspace`,
        `@tests/sass-error`,
        `run`,
        `bud`,
        `build`,
        `--mode`,
        `development`,
      ]);
    } catch (e) {
      expect(e.message.split(`\n`).pop()).toMatchInlineSnapshot(
        `"… watching project sources                                      ℹ [2mctrl+c to exit[22m"`
      );
    }
  });

  it(`should throw in production`, async () => {
    try {
      const { stdout } = await execa(`yarn`, [
        `workspace`,
        `@tests/sass-error`,
        `run`,
        `bud`,
        `build`,
      ]);
      expect(stdout.split(`\n`).splice(0, 10).join(`\n`))
        .toMatchInlineSnapshot(`
              "
              [38;2;255;92;87m✘[39m  @tests/sass-error [38;2;87;199;255m./dist[39m [2m[96e31d10feca25b55837][22m
              [2m│[22m
              [2m├─[22m [38;2;255;92;87m✘[39m [38;2;255;92;87merror[39m
              [2m│[22m [7mSassError: SassError: Expected escape sequence.[27m
              [2m│[22m   ╷
              [2m│[22m 1 │ \\
              [2m│[22m   │  ^
              [2m│[22m   ╵
              [2m│[22m   src/index.scss 1:2  root stylesheet"
          `);
    } catch (e) {}
  });
});
