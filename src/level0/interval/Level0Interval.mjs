import Level0IntervalParser from "./Level0IntervalParser.mjs"
import { Level0IntervalRenderer } from "./Level0IntervalRenderer.mjs"
import { Level0Date } from "../date/index.mjs"
import { EDTFError } from "../../EDTFError.mjs"

/**
 * @template S extends Level0Component = Level0Date
 * @template E extends Level0Component = Level0Date
 */
export class Level0Interval {
  /**
   * @readonly
   * @type {Level0Date|null|undefined}
   */
  #start

  /**
   * @param {Level0Date|null|undefined} start
   */
  set start(start) {
    if (typeof start === "string") {
      start = Level0Date.fromString(start)
    }
    if (start && !(start instanceof Level0Date)) {
      throw new EDTFError("Interval start is not a date: " + start)
    }
    this.#start = start
  }

  /**
   * @return {Level0Date|null|undefined}
   */
  get start() {
    return this.#start
  }

  /**
   * @readonly
   * @type {Level0Date|null|undefined}
   */
  #end

  /**
   * @param {Level0Date|null|undefined} end
   */
  set end(end) {
    if (typeof end === "string") {
      end = Level0Date.fromString(end)
    }
    if (end && !(end instanceof Level0Date)) {
      throw new EDTFError("Interval end is not a date: " + end)
    }
    this.#end = end
  }

  /**
   * @return {Level0Date|null|undefined}
   */
  get end() {
    return this.#end
  }

  /**
   * @param {Level0Date|null|undefined} start
   * @param {Level0Date|null|undefined} end
   */
  constructor (start, end) {
    this.start = start
    this.end = end
  }

  toString (renderer = Level0IntervalRenderer.instance) {
    return renderer.render(this)
  }

  /**
   * @param {string} spec
   * @param {Level0IntervalParser} parser
   */
  static fromString (spec, parser = new Level0IntervalParser()) {
    const { start, end } = parser.parse(spec)
    return new Level0Interval(start, end)
  }
}
