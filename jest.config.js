/** @type {import('jest').Config} */
const config = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.scss$': 'jest-scss-transform',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // "^@components/(.*)$": "/src/components/$1",
  },
};

export default config;
