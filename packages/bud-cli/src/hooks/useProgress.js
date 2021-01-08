"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProgress = void 0;
const bud_support_1 = require("@roots/bud-support");
const INITIAL_STATE = {
    percentage: {
        decimal: 0,
        display: `${0}%`,
    },
    msg: '',
};
const useProgress = () => {
    const [state, setState] = bud_support_1.useState(INITIAL_STATE);
    const handler = (percentage, msg) => {
        if (typeof percentage !== 'number')
            return;
        setState({
            percentage: {
                decimal: percentage,
                display: `${Math.floor(percentage * 100)}%`,
            },
            msg: msg !== null && msg !== void 0 ? msg : state.msg,
        });
    };
    return [state, handler];
};
exports.useProgress = useProgress;
//# sourceMappingURL=useProgress.js.map