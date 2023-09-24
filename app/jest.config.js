module.exports = {
    // Specify the root directory for Jest to look for test files
    roots: ['app/src'],
  
    // Specify the testing environment (you may need to adjust this based on your project)
    testEnvironment: 'jsdom',
  
    // Transform files before running tests (to support JSX and TypeScript)
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // Module file extensions to be considered
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
    // Define Jest test match patterns
    testMatch: ['app/src/**/*.test.(js|jsx|ts|tsx)'],
  
    // Configure Jest to collect code coverage information
    collectCoverage: true,
  
    // Specify the directory for code coverage reports
    coverageDirectory: 'app/coverage',
  
    // Define coverage report file types and locations (e.g., HTML, JSON, LCOV)
    coverageReporters: ['html', 'json', 'lcov', 'text'],
  
    // Setup test environment options (e.g., Enzyme, jsdom configuration)
    setupFilesAfterEnv: ['app/jest.setup.js'],
  
    // Configure test paths to mock (e.g., for static assets)
    moduleNameMapper: {
      '\\.(css|scss)$': 'app/__mocks__/styleMock.js', // Example: Mock CSS imports
    },
  };
  