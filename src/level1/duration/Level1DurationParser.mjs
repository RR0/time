import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level1ComponentParser } from "../component/Level1ComponentParser.mjs"

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

export class Level1DurationParser extends Level1ComponentParser {
  /**
   * @param {string} prefix RegExp group name prefix.
   * @return {string} The regExp pattern.
   */
  static format (prefix = "") {
    return "P"
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, yearsGroup), "+", undefined, "\\d"), "Y")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, monthsGroup), "+", undefined, "\\d"), "MM")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, daysGroup), "+", undefined, "\\d"), "D")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, hoursGroup), "+", undefined, "\\d"), "H")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, minutesGroup), "+", undefined, "\\d"), "M")
      + RegExpFormat.optionalNonCapturingGroup(RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, secondsGroup), "+", undefined, "\\d"), "S")
      + this.formatSuffix(prefix)
  }

  constructor () {
    super("duration", Level1DurationParser.format())
  }

  /**
   * @protected
   * @param {{ [p: string]: string }} groups
   */
  parseGroups (groups) {
    return {
      years: groups[yearsGroup],
      months: groups[monthsGroup],
      days: groups[daysGroup],
      hours: groups[hoursGroup],
      minutes: groups[minutesGroup],
      seconds: groups[secondsGroup],
      uncertain: Boolean(groups[Level1ComponentParser.uncertainGroup]),
      approximate: Boolean(groups[Level1ComponentParser.approximateGroup])
    }
  }
}
