"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGit = void 0;
const bud_support_1 = require("@roots/bud-support");
const fetch = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        head: ['rev-parse', '--short', 'HEAD'],
        branch: ['branch', '--show-current'],
        status: ['status', '--short'],
    };
    return yield bud_support_1.execa('git', params[key.replace('git.', '')]);
});
const useGit = () => {
    var _a, _b;
    const { data: head } = bud_support_1.useSwr('git.head', fetch);
    const { data: branch } = bud_support_1.useSwr('git.branch', fetch);
    const { data: status } = bud_support_1.useSwr('git.status', fetch);
    bud_support_1.useEffect(() => {
        setInterval(() => {
            bud_support_1.mutate('git.head');
            bud_support_1.mutate('git.branch');
            bud_support_1.mutate('git.status');
        }, 1000);
    }, []);
    const changed = (_a = status === null || status === void 0 ? void 0 : status.stdout) === null || _a === void 0 ? void 0 : _a.split('\n').filter(item => item !== '').length;
    const hasError = ((_b = [head, branch, status].filter(res => res === null || res === void 0 ? void 0 : res.stderr)) === null || _b === void 0 ? void 0 : _b.length) > 0;
    return {
        head: head === null || head === void 0 ? void 0 : head.stdout,
        branch: branch === null || branch === void 0 ? void 0 : branch.stdout,
        status: changed > 0 ? changed : null,
        hasError,
    };
};
exports.useGit = useGit;
//# sourceMappingURL=useGit.js.map