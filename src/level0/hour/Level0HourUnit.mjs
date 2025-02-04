import { level0MinuteUnit } from "../minute/Level0MinuteUnit.mjs"
import { HourUnit } from "../../unit/HourUnit.mjs"
import { Level0Day } from "../day/Level0Day.mjs"
import { Level0Hour } from "./Level0Hour.mjs"

export class Level0HourUnit extends HourUnit {
  /**
   * @param {number} max
   */
  constructor (max) {
    super(max, level0MinuteUnit)
  }

  /**
   * @param {number} value
   * @return {Level0Day}
   */
  create (value) {
    return new Level0Hour(value, this)
  }
}

export const level0HourUnit = new Level0HourUnit(level0MinuteUnit)
