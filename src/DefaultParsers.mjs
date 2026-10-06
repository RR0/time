import { EDTFError } from "./EDTFError.mjs"

/**
 * Registry of the parser used by default by each data class's `fromString()`.
 *
 * Data classes do not import their parsers, so that code which only builds or renders dates does not pay for parsing.
 * Parsing defaults are installed by importing `@rr0/time/defaults` (or a level-specific `.../level2/defaults`),
 * which is what the main `@rr0/time` entry point does. Alternatively, give an explicit parser to `fromString()`.
 */
export class DefaultParsers {
  /**
   * @type {Map<Function, function(): EDTFParser>}
   */
  static #factories = new Map()

  /**
   * @param {Function} dataClass The data class whose `fromString()` will use the parser.
   * @param {function(): EDTFParser} newParser Creates the parser.
   */
  static register(dataClass, newParser) {
    DefaultParsers.#factories.set(dataClass, newParser)
  }

  /**
   * @param {Function} dataClass
   * @return {EDTFParser}
   * @throws {EDTFError} If no default parser was registered for that class.
   */
  static get(dataClass) {
    const newParser = DefaultParsers.#factories.get(dataClass)
    if (!newParser) {
      throw new EDTFError(`No default parser registered for ${dataClass.name}: import "@rr0/time/defaults" or pass a parser to fromString()`)
    }
    return newParser()
  }
}
/** @import { EDTFParser } from "./EDTFParser.mjs" */
