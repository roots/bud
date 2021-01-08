"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warning = void 0;
const bud_support_1 = require("@roots/bud-support");
const Warning = ({ message }) => {
    bud_support_1.useEffect(() => {
        message &&
            bud_support_1.notify({
                title: 'Warning',
                message,
            });
    }, [message]);
    return (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column" }, message && bud_support_1.React.createElement(bud_support_1.Text, { wrap: "wrap" }, message)));
};
exports.Warning = Warning;
//# sourceMappingURL=Warning.js.map