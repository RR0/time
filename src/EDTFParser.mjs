import { EDTFError } from "./EDTFError.mjs"
import { AbstractMethodError } from "./AbstractMethodError.mjs"

/**
 * @abstract
 * @template P The result type of parsing
 */
export class EDTFParser {
  /**
   * @readonly
   * @type RegExp
   */
  regExp

  /**
   * Creates an EDTF parser.
   *
   * @protected
   * @param {string} name The name of the component to parse.
   * @param {string} format The Regexp pattern to match.
   */
  constructor(name, format) {
    this.name = name
    this.regExp = new RegExp(format)
  }

  /**
   * @protected
   * @param {string} str
   * @return {{[p: string]: string}}
   */
  regexGroups(str) {
    const parsed = this.regExp.exec(str)
    if (!parsed) {
      throw new EDTFError(`Invalid ${this.name} "${str}"`)
    }
    return parsed.groups
  }

  /**
   * @abstract
   * @protected
   * @param {{[p: string]: string}} groups The regex groups
   * @return {Record<string, any>} The parsing result.
   */
  parseGroups(groups) {
    throw new AbstractMethodError(`${this.constructor.name} is abstract`)
  }

  /**
   * Parses an EDTF string.
   *
   * @param {string} str An EDTF string to parse.
   * @return {P} The parse result object.
   */
  parse(str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
