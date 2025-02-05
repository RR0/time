import { Level1ComponentParser, Level1ComponentParseResult } from "../component/Level1ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

export class Level1YearParseResult extends Level1ComponentParseResult {
}

const name = "yearValue"

export class Level1YearParser extends Level1ComponentParser {
  /**
   * Creates a level-1 EDTF year component parser.
   */
  constructor() {
    super(name, Level1YearParser.format())
  }

  /**
   * The Regex pattern to match.
   *
   * @param {string} [prefix] The group name prefix, if any.
   * @return {string}
   */
  static format(prefix = "") {
    return "Y?" + Level1ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "+", "[-]?")
  }

  /**
   * @param {string} str
   * @return {Level1ComponentParseResult}
   */
  parse(str) {
    // Doesn't call super.parse(str) to avoid year negativity error.
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
