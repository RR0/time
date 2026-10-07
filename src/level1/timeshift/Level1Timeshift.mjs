import { DefaultParsers } from "../../DefaultParsers.mjs"
import { Level0Timeshift } from "../../level0/index.mjs"
/** @import { TimeshiftAt } from "../../level0/timeshift/UsDaylightSaving.mjs" */

export class Level1Timeshift extends Level0Timeshift {
  /**
   * @param {string} str
   * @param {EDTFParser} parser
   * @param {TimeshiftAt} [at] The time to read the time zone at, which "PT" (PST or PDT) needs.
   * @return {Level1Timeshift}
   */
  static fromString (str, parser = DefaultParsers.get(Level1Timeshift), at = undefined) {
    return new Level1Timeshift(parser.parse(str, at))
  }
}
