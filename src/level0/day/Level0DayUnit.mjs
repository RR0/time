import { DayUnit } from "../../unit/DayUnit.mjs"
import { level0HourUnit } from "../hour/index.mjs"
import { Level0Day } from "./Level0Day.mjs"

export class Level0DayUnit extends DayUnit {
  /**
   * @param {number} max
   */
  constructor (max) {
    super(max, level0HourUnit)
  }

  /**
   * @param {number} value
   * @return {Level0Day}
   */
  create (value) {
    return new Level0Day(value, this)
  }
}

export const level031DayUnit = new Level0DayUnit(31)
export const level030DayUnit = new Level0DayUnit(30)
export const level029DayUnit = new Level0DayUnit(29)
export const level028DayUnit = new Level0DayUnit(28)
