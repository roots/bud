# bud.assets

`bud.assets` allows you to include static assets in your build.

You can specify a path to a specific file or use glob syntax to match many files at once.

## Usage

Copy all files from `src/images` to `dist`:

```js
bud.assets(["images/**/*"]);
```

You don't need to import assets which are utilized by your bundled code. For instance, if you are referencing a font file from your stylesheet, the font will already be included in `dist`.

`bud.assets` is specifically for compiling files which are not already included elsewhere.
