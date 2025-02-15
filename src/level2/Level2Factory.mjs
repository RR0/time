import { LevelFactory } from "../LevelFactory.mjs"
import { Level2Year } from "./year/index.mjs"
import { Level2Month } from "./month/index.mjs"
import { Level2Day } from "./day/index.mjs"
import { Level2Minute } from "./minute/index.mjs"
import { Level2Second } from "./second/index.mjs"
import { Level2Hour } from "./hour/index.mjs"
import { durationUnits } from "../level0/duration/DurationUnits.mjs"
import { level2Calendar } from "./Level2Calendar.mjs"

/**
 * @template Y extends Level2Component = Level2Year
 * @template MM extends Level2Component = Level2Month
 * @template D extends Level2Component = Level2Day
 * @template H extends Level2Component = Level2Hour
 * @template M extends Level2Component = Level2Minute
 * @template S extends Level2Component = Level2Second
 * @template Z extends Level2Component = Level2Timeshift
 */
export class Level2Factory extends LevelFactory {
  /**
   * @param {TimeUnits} units
   */
  constructor(units) {
    super(units)
  }

  /**
   * @param {number} value
   * @return Y
   */
  newYear(value) {
    return new Level2Year(value, this.units.year)
  }

  /**
   * @param {number} value
   * @return MM
   */
  newMonth(value) {
    return new Level2Month(value, this.units.month)
  }

  /**
   * @param {number} value
   * @return D
   */
  newDay(value) {
    return new Level2Day(value, this.units.day)
  }

  /**
   * @param {number} value
   * @return H
   */
  newHour(value) {
    return new Level2Hour(value, this.units.hour)
  }

  /**
   * @param {number} value
   * @return M
   */
  newMinute(value) {
    return new Level2Minute(value, this.units.minute)
  }

  /**
   * @param {number} value
   * @return S
   */
  newSecond(value) {
    return new Level2Second(value, this.units.second)
  }
}

export const level2Factory = new Level2Factory(level2Calendar)

export const level2DurationFactory = new Level2Factory(durationUnits)
