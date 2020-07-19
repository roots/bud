export function hotModuleReplacement(): {
    setOptions: () => any;
    make: () => HotModuleReplacementPlugin;
    when: () => any;
};
import { HotModuleReplacementPlugin } from "webpack";
