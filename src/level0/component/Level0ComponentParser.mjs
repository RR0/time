import EDTFParser from "../../EDTFParser.mjs"
import { EDTFError } from "../../EDTFError.mjs"

export default class Level0ComponentParser extends EDTFParser {
  /**
   * @param {string} format
   * @param {string} [name]
   * @return {number}
   */
  constructor (format, name) {
    super(format, name)
  }

  /**
   * Interpret the string as decoded value(s) to construct a data type.
   *
   * @param {string} valueStr
   * @return {number}
   */
  static read (valueStr) {
    return valueStr ? parseInt(valueStr, 10) : undefined
  }

  /**
   * @param {string} str
   * @return {number}
   */
  parse (str) {
    if (str.startsWith("-")) {
      throw new EDTFError(`${this.name} cannot be negative`)
    }
    const groups = this.regexGroups(str)
    return Level0ComponentParser.read(groups[this.name])
  }
}
