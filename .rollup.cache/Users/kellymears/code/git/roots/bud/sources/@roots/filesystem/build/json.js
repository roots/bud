/* eslint-disable n/no-unpublished-import */
import fs from 'fs-jetpack';
import json5 from 'json5';
import stringify from 'safe-json-stringify';
export const read = async (path) => {
    const source = await fs.readAsync(path, `utf8`);
    try {
        return await json5.parse(source.trim());
    }
    catch (err) {
        const error = new Error(err?.message ?? err.toString());
        error.name = `json error`;
        error.message = `Error parsing JSON file: ${path}\n\n${error.message}`;
        throw error;
    }
};
export const { parse } = json5;
export const write = async (path, data, options) => {
    const source = typeof data !== `string`
        ? stringify(data, options?.replacer ?? null, options?.space ?? 2)
        : data;
    await fs.writeAsync(path, source);
};
export default {
    read,
    parse,
    write,
    stringify,
};
export { stringify };
//# sourceMappingURL=json.js.map