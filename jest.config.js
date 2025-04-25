module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$":      "<rootDir>/pages/$1",
    "\\.(css|scss)$":      "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$":   "babel-jest",
    "^.+\\.(ts|tsx)$":   "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ]
}
