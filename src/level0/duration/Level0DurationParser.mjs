import EDTFParser from "../../EDTFParser.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"

/**
 * @typedef {Object} Level0DurationParseResult
 * @property {number} [seconds]
 * @property {number} [minutes]
 * @property {number} [hours]
 * @property {number} [days]
 * @property {number} [months]
 * @property {number} [years]
 */

const yearsGroup = "years"
const monthsGroup = "months"
const daysGroup = "days"
const hoursGroup = "hours"
const minutesGroup = "minutes"
const secondsGroup = "seconds"

export default class Level0DurationParser extends EDTFParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return "P"
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, yearsGroup), "+", undefined, "\\d"), "Y")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, monthsGroup), "+", undefined, "\\d"), "MM")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, daysGroup), "+", undefined, "\\d"), "D")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, hoursGroup), "+", undefined, "\\d"), "H")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, minutesGroup), "+", undefined, "\\d"), "M")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, secondsGroup), "+", undefined, "\\d"), "S")
  }

  constructor () {
    super("duration", Level0DurationParser.format())
  }

  /**
   *
   * @param groups
   * @return {Level0DurationParseResult}
   */
  parseGroups (groups) {
    return {
      years: groups[yearsGroup],
      months: groups[monthsGroup],
      days: groups[monthsGroup],
      hours: groups[hoursGroup],
      minutes: groups[minutesGroup],
      seconds: groups[secondsGroup]
    }
  }

  /**
   * @param {string} str
   * @return {Level0DurationParseResult}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
