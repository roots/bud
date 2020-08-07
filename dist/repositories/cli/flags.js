import { argv } from 'yargs';
var flags = {
    log: argv.hasOwnProperty('log'),
    hot: argv.hasOwnProperty('hot'),
    watch: argv.hasOwnProperty('watch')
};
export { flags };
//# sourceMappingURL=flags.js.map