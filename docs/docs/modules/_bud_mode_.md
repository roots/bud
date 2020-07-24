# Module: "bud/mode"

## References

###  arguments

• **arguments**:

## Variables

### `Const` envArgument

• **envArgument**: *any* = argv.env

*Defined in [src/bud/mode.ts:13](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L13)*

specified via CLI arg

___

### `Const` envFallback

• **envFallback**: *string* = "production"

*Defined in [src/bud/mode.ts:8](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L8)*

Fallback env

___

### `Const` envProject

• **envProject**: *string* = env?.APP_ENV || envFallback

*Defined in [src/bud/mode.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L18)*

specified via project .env

___

### `Const` inProduction

• **inProduction**: *[Production](_bud_types_.md#production)* = mode === 'production'

*Defined in [src/bud/mode.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L39)*

## bud.inProduction

True if bud.mode is strictly equal to "production"

___

### `Const` mode

• **mode**: *[Mode](_bud_types_.md#mode)* = envArgument ? envArgument : envProject

*Defined in [src/bud/mode.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/mode.ts#L32)*

## bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

 - CLI args
 - env file

Fallback is 'production'.
