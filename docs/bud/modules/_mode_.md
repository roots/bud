# Module: "mode"

## Variables

### envArgument

• **envArgument**: _any_ = yargs_1.argv.env

Defined in mode.js:14

specified via CLI arg

---

### envFallback

• **envFallback**: _string_ = "production"

Defined in mode.js:10

Fallback env

---

### envProject

• **envProject**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV) || envFallback

Defined in mode.js:18

specified via project .env

---

### env_1

• **env_1**: _["state/env"](_state_env_.md)_ = require("./state/env")

Defined in mode.js:6

---

### inProduction

• **inProduction**: _boolean_ = mode == 'production'

Defined in mode.js:36

inProduction

---

### mode

• **mode**: _any_ = envArgument ? envArgument : envProject

Defined in mode.js:31

## bud.mode

Webpack mode ('development'|'production')

Determined by the first match, in order of precedence:

- CLI args
- env file

Fallback is 'production'.

---

### yargs_1

• **yargs_1**: _any_ = require("yargs")

Defined in mode.js:4
