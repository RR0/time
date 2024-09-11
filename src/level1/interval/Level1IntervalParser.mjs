import EDTFParser from "../../EDTFParser.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"
import Level1DateParser from "../date/Level1DateParser.mjs"
import Level1Date from "../date/Level1Date.mjs"

const startGroup = `start`
const endGroup = `end`

/**
 * @template S extends Level1Date
 * @template E extends Level1Date
 */
export default class Level1IntervalParser extends EDTFParser {
  /**
   * @type string
   * @readonly
   */
  static format = RegExpFormat.optionalGroup(startGroup, RegExpFormat.group("openStart", "\\.\\.") + "|" + Level1DateParser.format(startGroup))
    + "/" + RegExpFormat.optionalGroup(endGroup, RegExpFormat.group("openEnd", "\\.\\.") + "|" + Level1DateParser.format(endGroup))

  constructor () {
    super("interval", Level1IntervalParser.format)
  }

  /**
   * @protected
   * @param {string} str An EDTF level 0 interval string.
   * @return {{start: S, end: E}}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    const startStr = groups[startGroup]
    let start
    switch (startStr) {
      case undefined:
        start = null
        break
      case "..":
        start = undefined
        break
      default:
        start = Level1Date.fromString(startStr)
    }
    let end
    const endStr = groups[endGroup]
    switch (endStr) {
      case undefined:
        end = null
        break
      case "..":
        end = undefined
        break
      default:
        end = Level1Date.fromString(endStr)
    }
    return { start, end }
  }
}
