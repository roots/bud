import { build } from './webpack';
import { renderCompilerDashboard } from './renderCompilerDashboard';
var compiler = function (bud) { return ({
    bud: bud,
    dashboardEnabled: function () {
        return this.bud.features.enabled('dashboard');
    },
    buildConfig: function () {
        this.config = build(this.bud).make();
        return this;
    },
    compile: function () {
        this.bud.hooks.call('compiler.dashboard.pre');
        renderCompilerDashboard(this.bud, this.config);
        this.bud.hooks.call('compiler.dashboard.post');
    }
}); };
export { compiler };
//# sourceMappingURL=index.js.map