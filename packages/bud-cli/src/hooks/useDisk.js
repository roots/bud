"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDisk = void 0;
const bud_support_1 = require("@roots/bud-support");
const useDisk = (bud) => {
    const [target, setTarget] = bud_support_1.useState('project');
    const [disk, setDisk] = bud_support_1.useState(null);
    bud_support_1.useEffect(() => {
        setDisk(bud.disk.get(target));
    }, [target]);
    return [disk, setTarget];
};
exports.useDisk = useDisk;
//# sourceMappingURL=useDisk.js.map