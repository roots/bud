"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePackageJson = void 0;
const bud_support_1 = require("@roots/bud-support");
const usePackageJson = (disk) => {
    const [pkg, setPkg] = bud_support_1.useState({
        name: '@roots/bud',
    });
    bud_support_1.useEffect(() => {
        if (!disk)
            return;
        disk.exists('package.json') &&
            setPkg(Object.assign(Object.assign({}, pkg), disk.readJson('package.json')));
    }, [disk]);
    return pkg;
};
exports.usePackageJson = usePackageJson;
//# sourceMappingURL=usePackageJson.js.map