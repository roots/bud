import { Framework } from '..';
interface get {
    (this: Framework, name: string, tap?: (app: Framework) => Framework): Framework;
}
interface get {
    (name: string, tap?: (app: Framework) => Framework): Framework;
}
declare const get: get;
export { get };
//# sourceMappingURL=get.d.ts.map