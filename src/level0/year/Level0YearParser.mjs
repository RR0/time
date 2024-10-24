import { Level0ComponentParser } from "../component/Level0ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

/**
 * @typedef {Level0ComponentParseResult} Level0YearParseResult
 */

const name = "yearValue"

export class Level0YearParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{4}", undefined)
  }

  constructor () {
    super(name, Level0YearParser.format())
  }
}
