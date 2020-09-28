import { BuiltInParserName } from 'prettier';
declare type Formatter = (contents: string, parser: BuiltInParserName) => string;
declare const pretty: Formatter;
export default pretty;
