import { Level1ComponentParser, Level1ComponentParseResult } from "../component/Level1ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

export class Level1YearParseResult extends Level1ComponentParseResult {
}

const name = "yearValue"

export class Level1YearParser extends Level1ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return "Y?" + Level1ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "+", "[-]?")
  }

  constructor () {
    super(name, Level1YearParser.format())
  }
}
