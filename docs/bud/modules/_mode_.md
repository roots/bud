# Module: "mode"

## Variables

###  envArgument

• **envArgument**: *any* = yargs_1.argv.env

Defined in mode.js:14

specified via CLI arg

___

###  envFallback

• **envFallback**: *string* = "production"

Defined in mode.js:10

Fallback env

___

###  envProject

• **envProject**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV) || envFallback

Defined in mode.js:18

specified via project .env

___

###  env_1

• **env_1**: *["state/env"](_state_env_.md)* = require("./state/env")

Defined in mode.js:6

___

###  inProduction

• **inProduction**: *boolean* = mode == 'production'

Defined in mode.js:36

inProduction

___

###  mode

• **mode**: *any* = envArgument ? envArgument : envProject

Defined in mode.js:31

## bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

 - CLI args
 - env file

Fallback is 'production'.

___

###  yargs_1

• **yargs_1**: *any* = require("yargs")

Defined in mode.js:4
