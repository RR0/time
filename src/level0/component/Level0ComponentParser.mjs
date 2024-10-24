import { EDTFParser } from "../../EDTFParser.mjs"
import { EDTFError } from "../../EDTFError.mjs"

export class Level0ComponentParseResult {
  /**
   * @type number
   */
  value
}

/**
 * @template P extends Level0YearParseResult = Level0YearParseResult
 */
export class Level0ComponentParser extends /** @type {EDTFParser<Level0ComponentParseResult>} */ EDTFParser {
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
   * @return {Level0ComponentParseResult}
   */
  static read (valueStr) {
    return { value: valueStr ? parseInt(valueStr, 10) : undefined }
  }

  /**
   * @param {{ [p: string]: string }} groups
   * @return {Level0ComponentParseResult}
   */
  parseGroups (groups) {
    return Level0ComponentParser.read(groups[this.name])
  }

  /**
   * @param {string} str
   * @return {P}
   */
  parse (str) {
    if (str.startsWith("-")) {
      throw new EDTFError(`${this.name} cannot be negative`)
    }
    return super.parse(str)
  }
}
