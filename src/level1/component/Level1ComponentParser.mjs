import Level0ComponentParser from "../../level0/component/Level0ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const uncertainGroup = "uncertain"
const approximateGroup = "approx"
const uncertainAndApproximateGroup = uncertainGroup + approximateGroup

/**
 * @typedef {Level0YearParseResult} Level1YearParseResult
 * @property {number|{start: number, end: number}} value
 * @property {boolean} [approximateComponent]
 */

export default class Level1ComponentParser extends Level0ComponentParser {
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
   * @param {string} count
   * @param {string} name The group name
   * @param {string} prefix This can be allowed signs or "Y"
   * @return {string} The relevant regex pattern.
   */
  static numberFormat (name, count, prefix) {
    return RegExpFormat.numberGroup(name, count, prefix, "\\dX")
      + this.qualifierFormat(RegExpFormat.groupName(uncertainGroup, name), "?")
      + this.qualifierFormat(RegExpFormat.groupName(approximateGroup, name), "~")
      + this.qualifierFormat(RegExpFormat.groupName(uncertainAndApproximateGroup, name), "%")
  }

  /**
   * @param {string} format
   * @param {string} [name]
   * @return {number}
   */
  constructor (format, name) {
    super(format, name)
  }

  /**
   * @protected
   * @param groups
   * @return {Level1YearParseResult}
   */
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
    const uncertainApproximate = groups[RegExpFormat.groupName(uncertainAndApproximateGroup, this.name)]
    const approximate = groups[RegExpFormat.groupName(approximateGroup, this.name)] || uncertainApproximate
    const uncertain = groups[RegExpFormat.groupName(uncertainGroup, this.name)] || uncertainApproximate
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

  /**
   * @param {string} str The EDTF string.
   * @return {Level1YearParseResult}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
