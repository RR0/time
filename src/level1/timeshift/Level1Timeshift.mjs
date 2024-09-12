import { Level1TimeshiftParser } from "./Level1TimeshiftParser.mjs"
import { Level0Timeshift } from "../../level0/index.mjs"

export class Level1Timeshift extends Level0Timeshift {
  /**
   * @param {string} str
   * @return {Level1Timeshift}
   */
  static fromString (str) {
    const parser = new Level1TimeshiftParser()
    return new Level1Timeshift(parser.parse(str))
  }
}
