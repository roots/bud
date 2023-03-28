/**
 * Syncpack configuration
 *
 * @see {@link https://github.com/JamieMason/syncpack#-configuration-file}
 */
module.exports = {
  dev: true,
  filter: `^(?!@roots/).*$`,
  indent: `  `,
  overrides: true,
  dependencyTypes: [`dev`, `prod`],
  pnpmOverrides: true,
  prod: true,
  resolutions: true,
  workspace: true,
  semverRange: ``,
  versionGroups: [
    {
      dependencies: [`**`],
      packages: [`@repo/docs`],
      label: `Docusaurus`,
    },
    {
      dependencies: [`**`],
      packages: [`issue-*`],
      label: `Test code (fixtures)`,
    },
    {
      dependencies: [`**`],
      packages: [`@example/*`],
      label: `Example code`,
    },
  ],
}
