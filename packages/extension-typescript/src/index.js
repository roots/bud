"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.api = exports.setRules = exports.setItems = exports.setLoaders = exports.options = void 0;
const options = (instance) => {
    var _a;
    return ({
        configFile: (_a = instance.disk.get('project').get('tsconfig.json')) !== null && _a !== void 0 ? _a : null,
    });
};
exports.options = options;
exports.setLoaders = [
    'ts-loader',
    require.resolve('ts-loader'),
];
exports.setItems = {
    [`typescript`]: {
        loader: 'ts-loader',
        options: (bud) => bud.extensions.get('@roots/bud-typescript').all(),
    },
};
exports.setRules = {
    [`typescript`]: {
        test: ({ store }) => store.get('patterns.typescript'),
        exclude: ({ store }) => store.get('patterns.modules'),
        use: (bud) => [
            bud.build.items.get('ts'),
        ],
    },
};
exports.api = {
    typescript: function (options) {
        this.extensions.set('@roots/bud-typescript.options', options);
        return this;
    },
};
const boot = (app) => {
    app.store.set('typescript', /\.(ts|tsx)$/);
    ['ts', 'tsx'].map(ext => {
        !app.store.get('webpack.resolve.extensions').includes(ext) &&
            app.store.merge('webpack.resolve.extensions', [ext]);
    });
};
exports.boot = boot;
//# sourceMappingURL=index.js.map