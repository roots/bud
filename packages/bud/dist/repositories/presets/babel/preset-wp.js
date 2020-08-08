/**
 * @roots/babel-preset-wp
 */
export default (function () { return function (any) { return ({
    presets: [require('@babel/preset-env'), require('@babel/preset-react')],
    plugins: [
        require('@babel/plugin-syntax-dynamic-import'),
        require('@babel/plugin-proposal-object-rest-spread'),
        require('@babel/plugin-transform-runtime'),
    ]
}); }; });
//# sourceMappingURL=preset-wp.js.map