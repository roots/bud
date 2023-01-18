---
title: Handling blade `@asset` directives
---

It is probable that you have assets which are only referenced in the context of blade template files. However, by default **bud.js** ignores the Sage views directory. This means that **bud.js** will not build assets which are used only in blade template files.

The standard way of handling this predicament has been by calling [bud.assets](https://bud.js.org/docs/bud.copy) on the `resources/images` directory, which informs the compiler that it should include those files in the compilation.

However, as an alternative, you can opt-in to the processing of blade templates using **bud.sage.copyBladeAssets**. Once enabled, files referenced in blade templates using the `@assets` directive will be extracted and included in the compilation without the need for copying them.

```typescript file=bud.config.js
export default async bud => {
  bud.sage.copyBladeAssets()
}
```

The possible downside of this approach is that it may be slower than simply copying the directory contents, especially if you have a large number of blade partials. Conversely, if you had a very large number of images in your assets directory it could significantly reduce build times. It is very project dependent and thus opt-in.

That said, compilation speed isn't the full story, and the results of this process are cached so subsequent builds and dev server builds are not really effected much either way. There are other reasons you may want to consider processing blade partials as part of your build step -- namely image optimization.

With [@roots/bud-imagemin](https://bud.js.org/extensions/bud-imagemin) installed enabling this feature allows you to manipulate images using URL query parameters:

```php
<div class=foo>
  <img src=@asset('images/example.png?as=webp&width=200&height=200') alt="Example image" />
</div>
```

This may very well turn out to be worth trading a few extra seconds for!
