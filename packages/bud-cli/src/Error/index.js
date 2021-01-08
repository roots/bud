"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const bud_support_1 = require("@roots/bud-support");
const Error_1 = require("../containers/Error");
const Error = function (body, title, fatal = true) {
    const error = bud_support_1.render(bud_support_1.React.createElement(Error_1.Error, { title: title !== null && title !== void 0 ? title : 'Error', body: body }));
    if (fatal) {
        console.error(error);
        process.exit(1);
    }
    return error.toString();
};
exports.Error = Error;
//# sourceMappingURL=index.js.map