/**
 * Syncpack configuration
 *
 * @see {@link https://github.com/JamieMason/syncpack#-configuration-file}
 */
module.exports = {
  dev: true,
  filter: '^(?!@roots/).*$',
  indent: '  ',
  overrides: true,
  peer: false,
  pnpmOverrides: true,
  prod: true,
  resolutions: true,
  workspace: true,
  semverGroups: [],
  semverRange: '',
  versionGroups: [
    {
      dependencies: ['**'],
      packages: ['@repo/docs'],
    },
  ],
}
