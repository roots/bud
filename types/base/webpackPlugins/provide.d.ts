export function provide(): {
    setOptions: () => any;
    make: () => ProvidePlugin;
    when: () => any;
};
import { ProvidePlugin } from "webpack";
