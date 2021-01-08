"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBud = void 0;
const bud_support_1 = require("@roots/bud-support");
const useBud = (bud) => {
    const [mode, setMode] = bud_support_1.useState(null);
    bud_support_1.useEffect(() => {
        setMode(bud.get().mode);
    });
    return {
        mode,
    };
};
exports.useBud = useBud;
//# sourceMappingURL=useBud.js.map