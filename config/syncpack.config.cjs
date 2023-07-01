/**
 * Syncpack configuration
 *
 * @see {@link https://github.com/JamieMason/syncpack#-configuration-file}
 */
module.exports = {
  dependencyTypes: [`dev`, `prod`],
  filter: `^(?!@roots/).*$`,
  indent: `  `,
  semverRange: ``,
  sortFirst: [
    `name`,
    `private`,
    `version`,
    `description`,
    `engines`,
    `packageManager`,
    `contributors`,
    `license`,
    `homepage`,
    `funding`,
    `repository`,
    `bugs`,
    `keywords`,
    `bin`,
    `files`,
    `type`,
    `exports`,
    `typesVersions`,
    `types`,
    `main`,
    `module`,
    `devDependencies`,
    `dependencies`,
    `peerDependencies`,
    `peerDependenciesMeta`,
    `optionalDependencies`,
    `bundledDependencies`,
    `resolutions`,
    `scripts`,
    `workspaces`,
    `bud`,
    `volta`,
  ],
  versionGroups: [
    {
      dependencies: [`**`],
      label: `Docusaurus`,
      packages: [`@repo/docs`],
    },
    {
      dependencies: [`**`],
      label: `Test code (fixtures)`,
      packages: [`issue-*`],
    },
    {
      dependencies: [`**`],
      label: `Example code`,
      packages: [`@examples/*`],
    },
  ],
}
