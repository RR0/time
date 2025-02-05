import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level2DateParser } from "../date/Level2DateParser.mjs"
import { Level2DurationParser } from "../duration/Level2DurationParser.mjs"
import { Level2Duration } from "../duration/index.mjs"
import { Level2Date } from "../date/index.mjs"
import { EDTFParser } from "../../EDTFParser.mjs"

const datesIntervalGroup = "dates"
const startGroup = `start`
const endGroup = `end`

const durationsIntervalGroup = "durations"
const durationMinGroup = `durationMin`
const durationMaxGroup = `durationMax`

export class Level2IntervalParser extends EDTFParser {
  /**<>
   * @type string
   * @readonly
   */
  static format =
    RegExpFormat.group(datesIntervalGroup,
      RegExpFormat.optionalGroup(startGroup, RegExpFormat.group("openStart", "\\.\\.") + "|" + Level2DateParser.format(startGroup))
      + "/"
      + RegExpFormat.optionalGroup(endGroup, RegExpFormat.group("openEnd", "\\.\\.") + "|" + Level2DateParser.format(endGroup))
    )
    + "|"
    + RegExpFormat.group(durationsIntervalGroup,
      RegExpFormat.group(durationMinGroup, Level2DurationParser.format(durationMinGroup))
      + "/"
      + RegExpFormat.group(durationMaxGroup, Level2DurationParser.format(durationMaxGroup))
    )

  constructor(name = "interval", format = Level2IntervalParser.format) {
    super(name, format)
  }

  parseGroups(groups) {
    let start
    let end
    const durationIntervalStr = groups[durationsIntervalGroup]
    if (durationIntervalStr) {
      const durationMinStr = groups[durationMinGroup]
      start = Level2Duration.fromString(durationMinStr)
      const durationMaxStr = groups[durationMaxGroup]
      end = Level2Duration.fromString(durationMaxStr)
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
          start = Level2Date.fromString(startStr)
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
          end = Level2Date.fromString(endStr)
      }
    }
    return { start, end }
  }
}
