import { DefaultParsers } from "../../DefaultParsers.mjs"
import { Level0Timeshift } from "../../level0/index.mjs"

export class Level1Timeshift extends Level0Timeshift {
  /**
   * @param {string} str
   * @param {EDTFParser} parser
   * @return {Level1Timeshift}
   */
  static fromString (str, parser = DefaultParsers.get(Level1Timeshift)) {
    return new Level1Timeshift(parser.parse(str))
  }
}
