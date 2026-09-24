import { Level2ComponentParser } from "../component/Level2ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

const name = "durationValue"

/**
 * Parses the quantity of a duration unit (the "150" of "P150S").
 *
 * Unlike a date component (a minute of an hour, a day of a month), a duration quantity is not bounded to 2 digits.
 * The unit designator that follows the quantity ("S", "MM"...) is left unparsed.
 */
export class Level2DurationComponentParser extends Level2ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return "^" + Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "+", undefined)
  }

  constructor() {
    super(name, Level2DurationComponentParser.format())
  }
}
