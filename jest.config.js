module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      "^@/components/(.*)$": "<rootDir>/components/$1", // ✅ Resolves @/components/
      "^@/pages/(.*)$": "<rootDir>/pages/$1", // ✅ Resolves @/pages/
      "\\.(css|scss)$": "identity-obj-proxy", // ✅ Mocks CSS imports
    },
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  };
  