var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import { paths, REGISTRY_PROXY } from '@repo/constants';
import * as logger from '@repo/logger';
import { copy, readFile, remove } from 'fs-extra';
import { bind } from 'helpful-decorators';
import * as json5 from 'json5';
import { spawn } from 'node:child_process';
import { posix } from 'node:path';
const { join } = posix;
jest.setTimeout(120000);
/**
 * This class is used to represent an example project being used
 * as the subject of an integration test.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    name: 'basic',
 *    with: 'yarn',
 *  })

 *  await project.setup()
 *
 *  ...
 *  expect(project.packageJson).toMatchSnapshot()
 *  expect(project.assets['main.js'].length).toBeGreaterThan(10)
 *  ...
 * ```
 *
 * @internal
 */
export class Project {
    constructor(options) {
        this.options = options;
        this.mode = 'production';
        this.storage = '.budfiles';
        this.assets = {};
        this.entrypoints = {};
        this.manifest = {};
        this.modules = {
            chunks: {
                byName: null,
                bySource: null,
            },
        };
        this.packageJson = {};
        this.dir = join(paths.mocks, this.options.with, this.options.name);
        this.logger = logger
            .make({ interactive: true })
            .scope(this.options.name, this.options.with);
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setup() {
        await this.install();
        await this.build();
        await this.setPackageJson();
        await this.setManifest();
        await this.setAssets();
        await this.setModules();
        await this.setEntrypoints();
        this.logger.success('setup complete');
        return this;
    }
    async $(bin, flags) {
        try {
            await spawn(bin, flags ?? [], {
                cwd: this.projectPath(),
                shell: true,
            });
        }
        catch (error) {
            logger.error(error);
        }
    }
    async yarnInstall() {
        await this.$(`yarn`, [
            `install`,
            `--update-checksums`,
            `--skip-integrity-check`,
            `--registry`,
            REGISTRY_PROXY,
            `--force`,
        ]);
    }
    async npmInstall() {
        await this.$(`npm`, [`install`, `--registry`, REGISTRY_PROXY]);
    }
    async install() {
        this.logger.log('removing');
        try {
            await remove(this.projectPath());
        }
        catch (e) {
            logger.error(e);
        }
        this.logger.log('copying');
        try {
            await copy(`./examples/${this.options.name}`, this.projectPath());
        }
        catch (e) {
            logger.error(e);
        }
        this.logger.log('installing');
        this.options.with === 'yarn'
            ? await this.yarnInstall()
            : await this.npmInstall();
    }
    async build() {
        this.logger.log('building');
        this.options.with === 'yarn'
            ? await this.$(`yarn`, [`bud`, `build`, `--ci`])
            : await this.$(`node`, [`node_modules/.bin/bud`, `build`, `--ci`]);
    }
    /**
     * @public
     * @decorator `@bind`
     */
    projectPath(file) {
        return join(this.dir, file ?? '');
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async readJson(file) {
        const contentString = await readFile(file);
        return json5.parse(contentString.toString());
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setPackageJson() {
        const packageJson = await this.readJson(this.projectPath('package.json'));
        Object.assign(this, { packageJson });
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setManifest() {
        this.manifest = await this.readJson(this.projectPath(join(this.options.dist, 'manifest.json')));
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setAssets() {
        this.assets = await Object.entries(this.manifest).reduce(async (assets, [name, path]) => {
            logger.log('attempting to read', join(this.options.dist, path));
            const buffer = await readFile(this.projectPath(join(this.options.dist, path)), 'utf8');
            return {
                ...assets,
                [name]: buffer.toString(),
            };
        }, Promise.resolve());
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setEntrypoints() {
        try {
            const entrypoints = await this.readJson(this.projectPath(join(this.options.dist, 'entrypoints.json')));
            Object.assign(this, { entrypoints });
        }
        catch (e) { }
    }
    /**
     * @public
     * @decorator `@bind`
     */
    async setModules() {
        try {
            const modules = await this.readJson(this.projectPath(join(this.storage, 'bud', 'modules.json')));
            Object.assign(this, { modules });
        }
        catch (e) { }
    }
}
__decorate([
    bind
], Project.prototype, "setup", null);
__decorate([
    bind
], Project.prototype, "$", null);
__decorate([
    bind
], Project.prototype, "yarnInstall", null);
__decorate([
    bind
], Project.prototype, "npmInstall", null);
__decorate([
    bind
], Project.prototype, "install", null);
__decorate([
    bind
], Project.prototype, "build", null);
__decorate([
    bind
], Project.prototype, "projectPath", null);
__decorate([
    bind
], Project.prototype, "readJson", null);
__decorate([
    bind
], Project.prototype, "setPackageJson", null);
__decorate([
    bind
], Project.prototype, "setManifest", null);
__decorate([
    bind
], Project.prototype, "setAssets", null);
__decorate([
    bind
], Project.prototype, "setEntrypoints", null);
__decorate([
    bind
], Project.prototype, "setModules", null);
//# sourceMappingURL=project.js.map