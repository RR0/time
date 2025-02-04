import { LevelFactory } from "../LevelFactory.mjs"
import { Level0Year } from "./year/index.mjs"
import { Level0Month, level0MonthUnit } from "./month/index.mjs"
import { Level0Day } from "./day/index.mjs"
import { Level0Minute } from "./minute/index.mjs"
import { Level0Second } from "./second/index.mjs"
import { Level0Hour } from "./hour/index.mjs"
import { level0DurationUnits } from "./duration/Level0DurationUnits.mjs"
import { level0TimeUnits } from "./unit/Level0TimeUnits.mjs"

/**
 * @template Y extends Level1Component = Level1Year
 * @template MM extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template Z extends Level1Component = Level1Timeshift
 */
export class Level0Factory extends LevelFactory {
  /**
   *
   * @param {TimeUnits} units
   */
  constructor (units) {
    super(units)
  }

  /**
   * @param {number} value
   * @return Y
   */
  newYear (value) {
    return new Level0Year(value, this.units.year)
  }

  /**
   * @param {number} value
   * @param {number} year
   * @return MM
   */
  newMonth (value, year) {
    return new Level0Month(value, level0MonthUnit.create(value, year))
  }

  /**
   * @param {number} value
   * @return D
   */
  newDay (value) {
    return new Level0Day(value, this.units.day)
  }

  /**
   * @param {number} value
   * @return H
   */
  newHour (value) {
    return new Level0Hour(value, this.units.hour)
  }

  /**
   * @param {number} value
   * @return M
   */
  newMinute (value) {
    return new Level0Minute(value, this.units.minute)
  }

  /**
   * @param {number} value
   * @return S
   */
  newSecond (value) {
    return new Level0Second(value, this.units.second)
  }
}

export const level0Factory = new Level0Factory(level0TimeUnits)

export const level0DurationFactory = new Level0Factory(level0DurationUnits)
