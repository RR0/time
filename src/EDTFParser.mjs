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
   * @protected
   * @param {string} name
   * @param {string} format
   * @return {number}
   */
  constructor (name, format) {
    this.name = name
    this.regExp = new RegExp(format)
  }

  /**
   * @protected
   * @param {string} str
   * @return {{[p: string]: string}}
   */
  regexGroups (str) {
    const parsed = this.regExp.exec(str)
    if (!parsed) {
      throw new EDTFError(`Invalid ${this.name} "${str}"`)
    }
    return parsed.groups
  }

  /**
   * @abstract
   * @param {{[p: string]: string}} groups The regex groups
   * @return any The parse result object.
   */
  parseGroups (groups) {
    throw new AbstractMethodError(this)
  }

  /**
   * Parses an EDTF string.
   *
   * @param {string} str The string to parse.
   * @return {P} The parse result object.
   */
  parse (str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
