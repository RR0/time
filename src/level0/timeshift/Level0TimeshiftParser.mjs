import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { EDTFParser } from "../../EDTFParser.mjs"

const name = "timeshiftValue"
const shiftHourGroup = `shiftHour`
const shiftMinuteGroup = `shiftMinute`

export class Level0TimeshiftParser extends EDTFParser {

  static format (prefix = "") {
    return "Z|"
      + RegExpFormat.nonCapturingGroup(
        RegExpFormat.group(prefix + shiftHourGroup, RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{2}", "[+-]")),
        RegExpFormat.optionalNonCapturingGroup(":", RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, shiftMinuteGroup), "{2}", undefined))
      )
  }

  constructor () {
    super(name, Level0TimeshiftParser.format())
  }

  /**
   * @param {string} str
   * @return {number}
   */
  parse (str) {
    let shiftMinutes = 0
    if (str !== "Z") {
      const groups = this.regexGroups(str)
      const hourStr = groups[shiftHourGroup]
      if (hourStr) {
        shiftMinutes += parseInt(hourStr, 10) * 60
      }
      const minutesStr = groups[shiftMinuteGroup]
      if (minutesStr) {
        shiftMinutes += parseInt(minutesStr, 10)
      }
    }
    return shiftMinutes
  }
}
