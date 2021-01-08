"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompilation = void 0;
const bud_support_1 = require("@roots/bud-support");
const useCompilation = (bud) => {
    var _a, _b;
    const [stats, setStats] = bud_support_1.useState((_b = (_a = bud === null || bud === void 0 ? void 0 : bud.compiler) === null || _a === void 0 ? void 0 : _a.stats) === null || _b === void 0 ? void 0 : _b.json);
    const [errors, setErrors] = bud_support_1.useState(null);
    const [progress, setProgress] = bud_support_1.useState(null);
    bud_support_1.useEffect(() => {
        bud.compiler.compile();
    }, []);
    bud_support_1.useEffect(() => {
        var _a;
        if (!((_a = bud === null || bud === void 0 ? void 0 : bud.compiler) === null || _a === void 0 ? void 0 : _a.instance))
            return;
        bud.compiler.instance.hooks.done.tap('bud', stats => {
            if (stats.hasErrors()) {
                setErrors([
                    ...errors,
                    stats === null || stats === void 0 ? void 0 : stats.toString(bud.compiler.statsOptions.json),
                ]);
            }
            setStats(stats.toJson(bud.compiler.statsOptions.json));
        });
        new bud_support_1.ProgressPlugin((percentage, message) => {
            setProgress({
                decimal: percentage,
                percentage: `${Math.floor(percentage * 100)}%`,
                message,
            });
        }).apply(bud.compiler.instance);
        /**
         * Exec
         */
        !bud.mode.is('development')
            ? bud.compiler.instance.run((err, stats) => {
                if (stats === null || stats === void 0 ? void 0 : stats.hasErrors()) {
                    setErrors([...errors]);
                }
                stats &&
                    setStats(stats.toJson(bud.compiler.statsOptions.json));
            })
            : bud.server.run(bud.compiler.instance);
    }, [bud]);
    return {
        progress,
        stats,
        errors,
    };
};
exports.useCompilation = useCompilation;
//# sourceMappingURL=useCompilation.js.map