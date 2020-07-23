# Module: "state/env"

## Variables

### \_\_assign

• **\_\_assign**: _any_ = (this && this.**assign) || function () {
**assign = Object.assign || function(t) {
for (var s, i = 1, n = arguments.length; i < n; i++) {
s = arguments[i];
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
t[p] = s[p];
}
return t;
};
return \_\_assign.apply(this, arguments);
}

Defined in state/env.js:2

---

### \_\_importDefault

• **\_\_importDefault**: _any_ = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
}

Defined in state/env.js:13

---

### dotenv_1

• **dotenv_1**: _any_ = \_\_importDefault(require("dotenv"))

Defined in state/env.js:19

---

### env

• **env**: _any_ = \_\_assign({}, envRaw)

Defined in state/env.js:27

---

### envRaw

• **envRaw**: _any_ = dotenv_1["default"].config({
path: path_1.join(paths_1.paths.project, '.env')
}).parsed

Defined in state/env.js:24

Environment variables container.

---

### path_1

• **path_1**: _PlatformPath_ = require("path")

Defined in state/env.js:18

---

### paths_1

• **paths_1**: _["state/paths"](_state_paths_.md)_ = require("./paths")

Defined in state/env.js:20
