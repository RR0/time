import { EDTFError } from "./EDTFError.mjs"

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
   * @param {{[p: string]: string}} groups
   */
  parseGroups (groups) {
    throw new EDTFError(`${this.constructor.name} is abstract`)
  }

  /**
   * @param {string} str
   * @return {P}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
