module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
  },
};
