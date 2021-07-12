---
id: "framework.api.options"
title: "Interface: Options"
sidebar_label: "Options"
custom_edit_url: null
---

[Framework](../modules/framework.md).[Api](../modules/framework.api.md).Options

## Hierarchy

- `HtmlOptions`

  ↳ **`Options`**

## Properties

### cache

• `Optional` **cache**: `boolean`

Emit the file only if it was changed.

**`default`** true

#### Inherited from

HtmlOptions.cache

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:44

___

### chunks

• `Optional` **chunks**: `string`[] \| ``"all"``

List all entries which should be injected

#### Inherited from

HtmlOptions.chunks

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:48

___

### chunksSortMode

• `Optional` **chunksSortMode**: ``"auto"`` \| ``"manual"`` \| (`entryNameA`: `string`, `entryNameB`: `string`) => `number`

Allows to control how chunks should be sorted before they are included to the html.

**`default`** 'auto'

#### Inherited from

HtmlOptions.chunksSortMode

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:53

___

### enabled

• `Optional` **enabled**: `boolean`

Explicitly enable or disable html templating.

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:32

___

### excludeChunks

• `Optional` **excludeChunks**: `string`[]

List all entries which should not be injected

#### Inherited from

HtmlOptions.excludeChunks

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:60

___

### favicon

• `Optional` **favicon**: `string` \| ``false``

Path to the favicon icon

#### Inherited from

HtmlOptions.favicon

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:64

___

### filename

• `Optional` **filename**: `string` \| (`entryName`: `string`) => `string`

The file to write the HTML to.
Supports subdirectories eg: `assets/admin.html`
[name] will be replaced by the entry name
Supports a function to generate the name

**`default`** 'index.html'

#### Inherited from

HtmlOptions.filename

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:73

___

### hash

• `Optional` **hash**: `boolean`

If `true` then append a unique `webpack` compilation hash to all included scripts and CSS files.
This is useful for cache busting

#### Inherited from

HtmlOptions.hash

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:83

___

### inject

• `Optional` **inject**: `boolean` \| ``"body"`` \| ``"head"``

Inject all assets into the given `template` or `templateContent`.

#### Inherited from

HtmlOptions.inject

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:87

___

### meta

• `Optional` **meta**: ``false`` \| { [name: string]: `string` \| ``false`` \| { [attributeName: string]: `string` \| `boolean`;  };  }

Inject meta tags

#### Inherited from

HtmlOptions.meta

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:103

___

### minify

• `Optional` **minify**: `boolean` \| ``"auto"`` \| `Options`

HTML Minification options accepts the following values:
- Set to `false` to disable minifcation
- Set to `'auto'` to enable minifcation only for production mode
- Set to custom minification according to
[https://github.com/kangax/html-minifier#options-quick-reference](https://github.com/kangax/html-minifier#options-quick-reference)

#### Inherited from

HtmlOptions.minify

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:118

___

### publicPath

• `Optional` **publicPath**: `string`

By default the public path is set to `auto` - that way the html-webpack-plugin will try
to set the publicPath according to the current filename and the webpack publicPath setting

#### Inherited from

HtmlOptions.publicPath

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:78

___

### replace

• `Optional` **replace**: `Object`

Template variable names are used as keys.
Each key is associated with a replacement value.

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:42

___

### scriptLoading

• `Optional` **scriptLoading**: ``"blocking"`` \| ``"defer"``

Set up script loading
blocking will result in <script src="..."></script>
defer will result in <script defer src="..."></script>

**`default`** 'defer'

#### Inherited from

HtmlOptions.scriptLoading

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:99

___

### showErrors

• `Optional` **showErrors**: `boolean`

Render errors into the HTML page

#### Inherited from

HtmlOptions.showErrors

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:122

___

### template

• `Optional` **template**: `string`

Path to an HTML template to use. If none is supplied
one is provided as a default.

#### Overrides

HtmlOptions.template

#### Defined in

packages/@roots/bud-api/types/methods/template/index.d.ts:37

___

### templateContent

• `Optional` **templateContent**: `string` \| ``false`` \| (`templateParameters`: { [option: string]: `any`;  }) => `string` \| `Promise`<`string`\> \| `Promise`<`string`\>

Allow to use a html string instead of reading from a file

#### Inherited from

HtmlOptions.templateContent

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:131

___

### templateParameters

• `Optional` **templateParameters**: ``false`` \| (`compilation`: `any`, `assets`: { `css`: `string`[] ; `favicon?`: `string` ; `js`: `string`[] ; `manifest?`: `string` ; `publicPath`: `string`  }, `assetTags`: { `bodyTags`: `HtmlTagObject`[] ; `headTags`: `HtmlTagObject`[]  }, `options`: `ProcessedOptions`) => { [option: string]: `any`;  } \| `Promise`<`Object`\> \| { [option: string]: `any`;  }

Allows to overwrite the parameters used in the template

#### Inherited from

HtmlOptions.templateParameters

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:141

___

### title

• `Optional` **title**: `string`

The title to use for the generated HTML document

#### Inherited from

HtmlOptions.title

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:162

___

### xhtml

• `Optional` **xhtml**: `boolean`

Enforce self closing tags e.g. <link />

#### Inherited from

HtmlOptions.xhtml

#### Defined in

node_modules/html-webpack-plugin/typings.d.ts:166
