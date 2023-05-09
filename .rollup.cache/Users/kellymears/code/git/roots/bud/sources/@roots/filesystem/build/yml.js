/* eslint-disable n/no-unpublished-import */
import fs from 'fs-jetpack';
import yaml from 'js-yaml';
export const read = async (file) => {
    const source = await fs.readAsync(file, `utf8`);
    return yaml.load(source);
};
export const write = async (file, data) => {
    const source = yaml.dump(data, { skipInvalid: true });
    await fs.writeAsync(file, source);
};
export const parse = async (source) => {
    return yaml.load(source);
};
//# sourceMappingURL=yml.js.map