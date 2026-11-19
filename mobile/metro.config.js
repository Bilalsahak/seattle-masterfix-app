/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const sourceRoot = path.resolve(projectRoot, "../src");
const config = getDefaultConfig(projectRoot);

config.watchFolders = [sourceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(projectRoot, "../node_modules"),
];

module.exports = config;
