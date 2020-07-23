# Module: "hooks/index"

## Variables

### \_\_createBinding

• **\_\_createBinding**: _any_ = (this && this.\_\_createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}))

Defined in hooks/index.js:2

---

### hooks_1

• **hooks_1**: _["hooks/hooks"](_hooks_hooks_.md)_ = require("./hooks")

Defined in hooks/index.js:10
