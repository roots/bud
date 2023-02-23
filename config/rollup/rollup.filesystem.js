// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: {
    [`index`]: `./sources/@roots/filesystem/src/index.ts`,
    [`s3/index`]: `./sources/@roots/filesystem/src/s3/index.ts`,
    [`s3/client`]: `./sources/@roots/filesystem/src/s3/client.ts`,
    [`s3/config`]: `./sources/@roots/filesystem/src/s3/config.ts`,
    [`json`]: `./sources/@roots/filesystem/src/json.ts`,
    [`yml`]: `./sources/@roots/filesystem/src/yml.ts`,
  },
  output: {
    dir: `./sources/@roots/filesystem/lib`,
    format: `es`,
  },
  plugins: [
    typescript({
      compilerOptions: {
        allowJs: true,
        allowUnreachableCode: false,
        emitDecoratorMetadata: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        forceConsistentCasingInFileNames: true,
        importHelpers: true,
        importsNotUsedAsValues: `error`,
        jsx: `react`,
        lib: [`ES2021`, `DOM`, `DOM.Iterable`],
        module: `NodeNext`,
        moduleDetection: `force`,
        moduleResolution: `NodeNext`,
        noImplicitOverride: true,
        noUnusedLocals: true,
        removeComments: false,
        resolveJsonModule: false,
        sourceMap: true,
        skipLibCheck: true,
        strictBindCallApply: true,
        target: `es2021`,
        types: [`node`, `webpack`, `webpack-env`],
      },
      include: [`./sources/@roots/filesystem/src/**/*`],
    }),
    commonjs({
      extensions: [`.js`, `.ts`],
    }),
    json(),
    resolve({
      preferBuiltins: true,
      modulePaths: [`node_modules`],
    }),
  ],
}
