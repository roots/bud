import { join } from 'path';
import dotenv from 'dotenv';
var env = function (paths) {
    var _a;
    return ((_a = dotenv.config({
        path: join(paths.get('project'), '.env')
    }).parsed) !== null && _a !== void 0 ? _a : {});
};
export { env };
//# sourceMappingURL=env.js.map