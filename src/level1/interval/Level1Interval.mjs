import Level1IntervalParser from "./Level1IntervalParser.mjs"
import { Level0Interval } from "../../level0/index.mjs"
import { EDTFError } from "../../EDTFError.mjs"
import { Level1Date } from "../date/index.mjs"
import { Level1Duration } from "../duration/index.mjs"

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
   * @return {Level1Date|null|undefined}
   */
  get start () {
    return this._start
  }

  /**
   * @param {Level1Date|null|undefined} start
   */
  set start (start) {
    if (typeof start === "string") {
      super.start = Level1Date.fromString(start)
    }
    if (start && !(start instanceof Level1Date) && !(start instanceof Level1Duration)) {
      throw new EDTFError("Interval start is not a level 1 date or duration: " + start)
    }
    this._start = start
  }

  /**
   * @return {Level1Date|null|undefined}
   */
  get end () {
    return this._end
  }

  set end (end) {
    if (typeof end === "string") {
      end = Level1Date.fromString(end)
    }
    if (end && !(end instanceof Level1Date) && !(end instanceof Level1Duration)) {
      throw new EDTFError("Interval end is not a level 1 date or duration: " + end)
    }
    this._end = end
  }

  /**
   * @param {string} spec
   * @param {EDTFParser} parser
   * @return {Level1Interval}
   */
  static fromString (spec, parser = new Level1IntervalParser()) {
    const { start, end } = parser.parse(spec)
    return new Level1Interval(start, end)
  }
}
