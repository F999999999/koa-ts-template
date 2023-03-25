import type { JestConfigWithTsJest } from "ts-jest";
import { jsWithTsESM as tsjPreset } from "ts-jest/presets";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts"],
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // This will be set to 'baseUrl' value
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    // "^@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ...tsjPreset.transform,
  },
};

export default jestConfig;
