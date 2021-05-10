module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/docs/',
    '/dev/',
  ],
}
