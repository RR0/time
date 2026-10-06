export * from "./core.mjs"
// Installs the default parsers, so that `fromString()` works out of the box.
// Import "@rr0/time/core" instead to avoid bundling the parsers.
import "./defaults.mjs"
