# Module: "bud/state/types"

## References

###  WordPressDependenciesOptions

• **WordPressDependenciesOptions**:

## Type aliases

###  BabelConfiguration

Ƭ **BabelConfiguration**: *object*

*Defined in [src/bud/state/types.ts:51](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L51)*

#### Type declaration:

* **plugins**: *[]*

* **presets**: *[]*

___

###  BrowserSync

Ƭ **BrowserSync**: *BrowserSyncOptions*

*Defined in [src/bud/state/types.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L55)*

___

###  Configs

Ƭ **Configs**: *object*

*Defined in [src/bud/state/types.ts:101](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L101)*

Configs

#### Type declaration:

* **babel**: *string | null*

* **eslint**: *string | null*

* **postCss**: *string | null*

* **typescript**: *string | null*

___

###  Copy

Ƭ **Copy**: *object*

*Defined in [src/bud/state/types.ts:56](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L56)*

#### Type declaration:

* **patterns**: *object[]*

___

###  Dev

Ƭ **Dev**: *any*

*Defined in [src/bud/state/types.ts:60](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L60)*

___

###  Directory

Ƭ **Directory**: *string*

*Defined in [src/bud/state/types.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L18)*

Paths

___

###  Environment

Ƭ **Environment**: *any*

*Defined in [src/bud/state/types.ts:111](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L111)*

Env

___

###  Externals

Ƭ **Externals**: *WebpackConfiguration["externals"]*

*Defined in [src/bud/state/types.ts:61](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L61)*

___

###  Features

Ƭ **Features**: *object*

*Defined in [src/bud/state/types.ts:75](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L75)*

Features

#### Type declaration:

* **babel**: *boolean*

* **browserSync**: *boolean*

* **dashboard**: *boolean*

* **debug**: *boolean*

* **dependencyManifest**: *boolean*

* **dump**: *boolean*

* **eslint**: *boolean*

* **hash**: *boolean*

* **hot**: *boolean*

* **inlineManifest**: *boolean*

* **minified**: *boolean*

* **overlay**: *boolean*

* **postCss**: *boolean*

* **purge**: *boolean*

* **sourceMap**: *boolean*

* **splitting**: *boolean*

* **translate**: *boolean*

* **typescript**: *boolean*

* **vendor**: *boolean*

* **watch**: *boolean*

___

###  Options

Ƭ **Options**: *object*

*Defined in [src/bud/state/types.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L30)*

Options

#### Type declaration:

* **alias**: *any*

* **auto**: *any*

* **babel**: *[BabelConfiguration](_bud_state_types_.md#babelconfiguration)*

* **browserSync**: *Object*

* **copy**: *[Copy](_bud_state_types_.md#copy)*

* **dependencyManifest**: *DependencyExtractionOptions*

* **dev**: *any*

* **devtool**: *any*

* **entry**: *any*

* **env**: *any*

* **externals**: *[Externals](_bud_state_types_.md#externals)*

* **inlineManifest**: *Object*

* **postCss**: *[PostCssConfiguration](_bud_state_types_.md#postcssconfiguration)*

* **splitting**: *Object*

* **svg**: *[Svg](_bud_state_types_.md#svg)*

* **target**: *WebpackConfiguration["target"]*

* **typescript**: *[Typescript](_bud_state_types_.md#typescript)*

* **uglify**: *Object*

* **vendor**: *[Vendor](_bud_state_types_.md#vendor)*

___

###  Paths

Ƭ **Paths**: *object*

*Defined in [src/bud/state/types.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L19)*

#### Type declaration:

* **dist**: *[Directory](_bud_state_types_.md#directory)*

* **framework**: *[Directory](_bud_state_types_.md#directory)*

* **project**: *[Directory](_bud_state_types_.md#directory)*

* **public**: *[Directory](_bud_state_types_.md#directory)*

* **src**: *[Directory](_bud_state_types_.md#directory)*

___

###  PostCssConfiguration

Ƭ **PostCssConfiguration**: *object*

*Defined in [src/bud/state/types.ts:62](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L62)*

#### Type declaration:

* **plugins**: *[]*

___

###  State

Ƭ **State**: *object*

*Defined in [src/bud/state/types.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L8)*

Mitch, all together.

#### Type declaration:

* **configs**: *[Configs](_bud_state_types_.md#configs)*

* **features**: *[Features](_bud_state_types_.md#features)*

* **options**: *[Options](_bud_state_types_.md#options)*

* **paths**: *[Paths](_bud_state_types_.md#paths)*

___

###  Svg

Ƭ **Svg**: *any*

*Defined in [src/bud/state/types.ts:65](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L65)*

___

###  Target

Ƭ **Target**: *WebpackConfiguration["target"]*

*Defined in [src/bud/state/types.ts:66](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L66)*

___

###  Typescript

Ƭ **Typescript**: *Object*

*Defined in [src/bud/state/types.ts:67](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L67)*

___

###  Vendor

Ƭ **Vendor**: *object*

*Defined in [src/bud/state/types.ts:68](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/types.ts#L68)*

#### Type declaration:

* **name**: *String*
