import EDTFParser from "../../EDTFParser.mjs"
import Level0DateParser from "../date/Level0DateParser.mjs"
import Level0Date from "../date/Level0Date.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"

const startGroup = `start`
const endGroup = `end`

/**
 * @template S extends Level0Date
 * @template E extends Level0Date
 */
export default class Level0IntervalParser extends EDTFParser {
  /**
   * @type string
   * @readonly
   */
  static format = RegExpFormat.group(startGroup, Level0DateParser.format(startGroup))
    + "/" + RegExpFormat.group(endGroup, Level0DateParser.format(endGroup))

  constructor () {
    super("interval", Level0IntervalParser.format)
  }

  /**
   * @protected
   * @param {string} str An EDTF level 0 interval string.
   * @return {{start: S, end: E}}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    const startStr = groups[startGroup]
    const endStr = groups[endGroup]
    return {
      start: startStr ? Level0Date.fromString(startStr) : undefined,
      end: endStr ? Level0Date.fromString(endStr) : undefined
    }
  }
}
