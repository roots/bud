# Module: "state/env"

## Variables

###  __assign

• **__assign**: *any* = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
}

Defined in state/env.js:2

___

###  __importDefault

• **__importDefault**: *any* = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}

Defined in state/env.js:13

___

###  dotenv_1

• **dotenv_1**: *any* = __importDefault(require("dotenv"))

Defined in state/env.js:19

___

###  env

• **env**: *any* = __assign({}, envRaw)

Defined in state/env.js:27

___

###  envRaw

• **envRaw**: *any* = dotenv_1["default"].config({
    path: path_1.join(paths_1.paths.project, '.env')
}).parsed

Defined in state/env.js:24

Environment variables container.

___

###  path_1

• **path_1**: *PlatformPath* = require("path")

Defined in state/env.js:18

___

###  paths_1

• **paths_1**: *["state/paths"](_state_paths_.md)* = require("./paths")

Defined in state/env.js:20
