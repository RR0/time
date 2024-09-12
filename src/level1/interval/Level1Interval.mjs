import Level1IntervalParser from "./Level1IntervalParser.mjs"
import { Level0Interval } from "../../level0/interval/Level0Interval.mjs"

/**
 * @template S extends Level1Date = Level1Date
 * @template E extends Level1Date = Level1Date
 */
export class Level1Interval extends Level0Interval {
  /**
   * @param {S} start
   * @param {E} end
   */
  constructor (start, end) {
    super(start, end)
  }

  /**
   * @param {string} spec
   * @return {Level1Interval}
   */
  static fromString (spec) {
    const parser = /** Level1DateParser<Level1Year, Level1Month, Level1Day> */ new Level1IntervalParser()
    const { start, end } = parser.parse(spec)
    return new Level1Interval(start, end)
  }
}
