import { EDTFParser } from "../../EDTFParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level1DateParser } from "../date/Level1DateParser.mjs"
import { Level1Date } from "../date/index.mjs"
import { Level1DurationParser } from "../duration/Level1DurationParser.mjs"
import { Level1Duration } from "../duration/index.mjs"

const datesIntervalGroup = "dates"
const startGroup = `start`
const endGroup = `end`

const durationsIntervalGroup = "durations"
const durationMinGroup = `durationMin`
const durationMaxGroup = `durationMax`

/**
 * @template S extends Level1Date
 * @template E extends Level1Date
 */
export default class Level1IntervalParser extends EDTFParser {
  /**
   * @type string
   * @readonly
   */
  static format =
    RegExpFormat.group(datesIntervalGroup,
      RegExpFormat.optionalGroup(startGroup, RegExpFormat.group("openStart", "\\.\\.") + "|" + Level1DateParser.format(startGroup))
      + "/"
      + RegExpFormat.optionalGroup(endGroup, RegExpFormat.group("openEnd", "\\.\\.") + "|" + Level1DateParser.format(endGroup))
    )
    + "|"
    + RegExpFormat.group(durationsIntervalGroup,
      RegExpFormat.group(durationMinGroup, Level1DurationParser.format(durationMinGroup))
      + "/"
      + RegExpFormat.group(durationMaxGroup, Level1DurationParser.format(durationMaxGroup))
    )

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
    let start
    let end
    const durationIntervalStr = groups[durationsIntervalGroup]
    if (durationIntervalStr) {
      const durationMinStr = groups[durationMinGroup]
      start = Level1Duration.fromString(durationMinStr)
      const durationMaxStr = groups[durationMaxGroup]
      end = Level1Duration.fromString(durationMaxStr)
    } else {
      const startStr = groups[startGroup]
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
    }
    return { start, end }
  }
}
