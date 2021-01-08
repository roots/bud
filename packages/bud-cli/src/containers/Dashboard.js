"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const Reporter_1 = require("./Reporter");
const useDisk_1 = require("../hooks/useDisk");
const usePackageJson_1 = require("../hooks/usePackageJson");
const useCompilation_1 = require("../hooks/useCompilation");
const useBud_1 = require("../hooks/useBud");
const Dashboard = ({ bud }) => {
    const app = bud_support_1.useApp();
    const { mode } = useBud_1.useBud(bud);
    const [disk] = useDisk_1.useDisk(bud);
    const { stats, progress, errors } = useCompilation_1.useCompilation(bud);
    const pkg = usePackageJson_1.usePackageJson(disk);
    const style = ink_use_style_1.useStyle();
    bud_support_1.useInput(input => {
        if (input == 'q') {
            app.exit();
            console.clear();
            process.exit();
        }
    });
    /**
     * @todo setTimeout here is bad
     */
    bud_support_1.useEffect(() => {
        var _a;
        if (bud.mode.is('production') &&
            ((_a = stats === null || stats === void 0 ? void 0 : stats.assets) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
            bud_support_1.isEqual(progress === null || progress === void 0 ? void 0 : progress.decimal, 1)) {
            setTimeout(() => {
                app.exit();
                process.exit();
            }, 100);
        }
    }, [bud]);
    return (bud_support_1.React.createElement(Reporter_1.Reporter, Object.assign({ errors: errors, bud: bud, mode: mode, stats: stats, progress: progress, pkg: pkg }, style)));
};
exports.Dashboard = Dashboard;
//# sourceMappingURL=Dashboard.js.map