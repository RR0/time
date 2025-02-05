import { Level0ComponentParser, Level0ComponentParseResult } from "../../level0/component/Level0ComponentParser.mjs"
/** @import { Level0ComponentParseResult } from "../../level0/component/Level0ComponentParser.mjs" */
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

export class Level1ComponentParseResult extends Level0ComponentParseResult {
  /**
   * The data component value, or induced value interval.
   *
   * @type {number|{start: number, end: number}}
   */
  value

  /**
   * The component (say, month) and all its subcomponents (say, day, hour, minutes and seconds) are uncertain.
   *
   * @optional
   * @type boolean
   */
  uncertain

  /**
   * The component (say, month) and all its subcomponents (say, day, hour, minutes and seconds) are approximate.
   *
   * @optional
   * @type boolean
   */
  approximate
}

/**
 * Parses a date component according to level 1 EDTF standard, which provides support for:
 * - uncertainty group ("?" to the right of a component, thus apply to all components on the right)
 * - approximation group ("~" to the right of a component, thus apply to all components on the right)
 * - uncertainty + approximation on a group ("%" to the right of a component, thus apply to all components on the right)
 *
 * @template P extends Level1YearParseResult = Level1YearParseResult
 */
export class Level1ComponentParser extends /** @type {EDTFParser<Level1ComponentParseResult>} */ Level0ComponentParser {
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
   * Creates a level-1 EDTF date component parser.
   *
   * @param {string} name The name of the component to parse ("yearValue" or whatever)
   * @param {string} format The Regexp pattern to match.
   */
  constructor(name, format) {
    super(name, format)
  }

  /**
   * Produces an optional group expecting a given char.
   *
   * @param {string} name The group name
   * @param {string} char The char to optionally expect.
   * @return {string} The relevant regex pattern.
   */
  static qualifierFormat(name, char) {
    return RegExpFormat.optionalGroup(name, `\\${char}`)
  }

  /**
   * @param {string} name The group name
   * @return {string} The relevant regex pattern.
   */
  static formatSuffix(name) {
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
  static numberFormat(name, count, prefix) {
    return RegExpFormat.numberGroup(name, count, prefix, "\\dX") + this.formatSuffix(name)
  }

  /**
   * @protected
   * @param groups
   * @return {{valueStr: string, sign: number}}
   */
  getValueAndSign(groups) {
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
   * @param {{ [p: string]: string }} groups
   * @return {Level1ComponentParseResult}
   */
  parseGroups(groups) {
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
}
