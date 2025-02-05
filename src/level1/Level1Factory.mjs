import { LevelFactory } from "../LevelFactory.mjs"
import { Level1Year } from "./year/index.mjs"
import { Level1Month } from "./month/index.mjs"
import { Level1Day } from "./day/index.mjs"
import { Level1Minute } from "./minute/index.mjs"
import { Level1Second } from "./second/index.mjs"
import { Level1Hour } from "./hour/index.mjs"
import { durationUnits } from "../level0/index.mjs"
import { level1Calendar } from "./Level1Calendar.mjs"

/**
 * @template Y extends Level1Component = Level1Year
 * @template MM extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template Z extends Level1Component = Level1Timeshift
 */
export class Level1Factory extends LevelFactory {
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
    return new Level1Year(value, this.units.year)
  }

  /**
   * @param {number} value
   * @return MM
   */
  newMonth(value) {
    return new Level1Month(value, this.units.month)
  }

  /**
   * @param {number} value
   * @return D
   */
  newDay(value) {
    return new Level1Day(value, this.units.day)
  }

  /**
   * @param {number} value
   * @return H
   */
  newHour(value) {
    return new Level1Hour(value, this.units.hour)
  }

  /**
   * @param {number} value
   * @return M
   */
  newMinute(value) {
    return new Level1Minute(value, this.units.minute)
  }

  /**
   * @param {number} value
   * @return S
   */
  newSecond(value) {
    return new Level1Second(value, this.units.second)
  }
}

export const level1Factory = new Level1Factory(level1Calendar)

export const level1DurationFactory = new Level1Factory(durationUnits)
