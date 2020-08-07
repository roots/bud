import { cloneDeep } from 'lodash';
var except = function (target, properties) {
    var freshObj = cloneDeep(target);
    properties.forEach(function (key) {
        delete freshObj[key];
    });
    return freshObj;
};
export { except };
//# sourceMappingURL=except.js.map