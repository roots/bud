/**
 * Jest config
 * @see https://jestjs.io/docs/en/configuration.html
 */
module.exports = async function config() {
  return {
    /**
     * @see https://jestjs.io/docs/configuration#projects-arraystring--projectconfig
     */
    projects: [
      '<rootDir>/jest.unit.js',
      '<rootDir>/jest.integration.js',
    ],
  }
}
