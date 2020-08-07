import dotenv from 'dotenv';
var env = function (framework) {
    var _a;
    return ((_a = dotenv.config({
        path: framework.fs.path.join(framework.paths.get('project'), '.env')
    }).parsed) !== null && _a !== void 0 ? _a : {});
};
export { env };
//# sourceMappingURL=env.js.map