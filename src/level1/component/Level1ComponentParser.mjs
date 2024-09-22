import { Level0ComponentParser } from "../../level0/component/Level0ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

/**
 * @typedef {Level0YearParseResult} Level1YearParseResult
 * @property {number|{start: number, end: number}} value
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

export class Level1ComponentParser extends Level0ComponentParser {
  /**
   * @readonly
   * @type {string}
   */
  static uncertainGroup = "uncertain"

  /**
   * @readonly
   * @type {string}
   */
  static approximateGroup = "approx"

  /**
   * @readonly
   * @type {string}
   */
  static uncertainAndApproximateGroup = Level1ComponentParser.uncertainGroup + Level1ComponentParser.approximateGroup

  /**
   * Produces an optional group expecting a given char.
   *
   * @param {string} name The group name
   * @param {string} char The char to optionally expect.
   * @return {string} The relevant regex pattern.
   */
  static qualifierFormat (name, char) {
    return RegExpFormat.optionalGroup(name, `\\${char}`)
  }

  /**
   * @param {string} name The group name
   * @return {string} The relevant regex pattern.
   */
  static formatSuffix (name) {
    return this.qualifierFormat(RegExpFormat.groupName(Level1ComponentParser.uncertainGroup, name), "?")
      + this.qualifierFormat(RegExpFormat.groupName(Level1ComponentParser.approximateGroup, name), "~")
      + this.qualifierFormat(RegExpFormat.groupName(Level1ComponentParser.uncertainAndApproximateGroup, name), "%")
  }

  /**
   * @param {string} count
   * @param {string} name The group name
   * @param {string} prefix This can be allowed signs or "Y"
   * @return {string} The relevant regex pattern.
   */
  static numberFormat (name, count, prefix) {
    return RegExpFormat.numberGroup(name, count, prefix, "\\dX") + this.formatSuffix(name)
  }

  /**
   * @param {string} name
   * @param {string} format
   * @return {number}
   */
  constructor (name, format) {
    super(name, format)
  }

  parseGroups (groups) {
    const { valueStr, sign } = this.getValueAndSign(groups)
    let value = 0
    let i
    for (i = 0; i < valueStr.length; i++) {
      const char = valueStr[i]
      if (char === "X") { break }
      value = value * 10 + parseInt(char, 10)
    }
    if (i < valueStr.length) {
      let startDelta = 1
      for (let j = 0; j < valueStr.length - i; j++) {
        startDelta *= 10
      }
      const start = sign * value * startDelta
      const end = start + startDelta - 1
      value = { start, end }
    } else {
      value *= sign
    }
    const uncertainApproximate = groups[RegExpFormat.groupName(Level1ComponentParser.uncertainAndApproximateGroup, this.name)]
    const approximate = groups[RegExpFormat.groupName(Level1ComponentParser.approximateGroup, this.name)] || uncertainApproximate
    const uncertain = groups[RegExpFormat.groupName(Level1ComponentParser.uncertainGroup, this.name)] || uncertainApproximate
    return {
      value,
      approximate: approximate ? Boolean(approximate) : false,
      uncertain: uncertain ? Boolean(uncertain) : false
    }
  }

  /**
   * @protected
   * @param groups
   * @return {{valueStr: string, sign: number}}
   */
  getValueAndSign (groups) {
    let valueStr = groups[this.name]
    let sign
    if (valueStr.charAt(0) === "-") {
      sign = -1
      valueStr = valueStr.substring(1)
    } else {
      sign = 1
    }
    return { valueStr, sign }
  }

  parse (str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
