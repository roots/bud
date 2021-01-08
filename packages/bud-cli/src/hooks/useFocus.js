"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocus = void 0;
const bud_support_1 = require("@roots/bud-support");
const INITIAL = {
    initialData: {
        active: 'assets',
        items: {
            assets: true,
            errors: false,
            warnings: false,
            dev: false,
        },
    },
};
const useFocus = (initial = INITIAL) => {
    const { data } = bud_support_1.useSwr('focus', initial);
    const [focus, setFocus] = bud_support_1.useState(data);
    bud_support_1.useEffect(() => {
        bud_support_1.mutate('focus', Object.assign(Object.assign({}, Object.entries(data.items).reduce((acc, [name]) => (Object.assign(Object.assign({}, acc), { [name]: false })), data.items)), { [focus.active]: true }));
    }, [focus]);
    return [focus, setFocus];
};
exports.useFocus = useFocus;
//# sourceMappingURL=useFocus.js.map