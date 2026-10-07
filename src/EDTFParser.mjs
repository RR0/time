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
   * Whether the whole string must match (no leading nor trailing garbage), instead of just a prefix of it.
   * Lenient by default for backward compatibility: some parsers (durations, for instance) rely on prefix matching.
   *
   * @type {boolean}
   */
  strict = false

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
    // exec() reads its argument as a string, but an object can be given (a date to read again, for instance)
    if (!parsed || (this.strict && (parsed.index !== 0 || parsed[0].length !== String(str).length))) {
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
