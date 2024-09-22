import { EDTFParser } from "../../EDTFParser.mjs"
import { EDTFError } from "../../EDTFError.mjs"

/**
 * @typedef {Object} Level0YearParseResult
 * @property {number} value
 */

/**
 * @template P
 */
export class Level0ComponentParser extends EDTFParser {
  /**
   * @param {string} name
   * @param {string} format
   * @return {number}
   */
  constructor (name, format) {
    super(name, format)
  }

  /**
   * Interpret the string as decoded value(s) to construct a data type.
   *
   * @param {string} valueStr
   * @return {Level0YearParseResult}
   */
  static read (valueStr) {
    return { value: valueStr ? parseInt(valueStr, 10) : undefined }
  }

  /**
   * @protected
   * @param {{ [p: string]: string }} groups
   */
  parseGroups (groups) {
    return Level0ComponentParser.read(groups[this.name])
  }

  /**
   * @param {string} str
   * @return {Level0YearParseResult}
   */
  parse (str) {
    if (str.startsWith("-")) {
      throw new EDTFError(`${this.name} cannot be negative`)
    }
    return super.parse(str)
  }
}
