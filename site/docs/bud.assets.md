# bud.assets

**bud.assets** allows you to include static assets in your build.

You can specify a path to a specific file or use glob syntax to match many files at once.

## Usage

Copy an image to your disribution directory:

```js
bud.assets(['images/image.png'])
```

## Use file globbing

Copy all files an images directory to your distribution directory:

```js
bud.assets(['images/**/*'])
```

## Additional information

You don't need to import assets which are utilized by your bundled code. For instance, if you are referencing a font file from your stylesheet, the font will already be included in your distribution. You don't need to manually require it with **bud.assets**, although there is probably no real harm in doing so.

**bud.assets** is specifically for compiling files which are not already included elsewhere.
