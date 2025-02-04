import { MinuteUnit } from "../../unit/MinuteUnit.mjs"
import { level0SecondUnit } from "../second/Level0SecondUnit.mjs"
import { Level0Minute } from "./Level0Minute.mjs"

export class Level0MinuteUnit extends MinuteUnit {
  /**
   * @param {number} max
   */
  constructor (max) {
    super(max, level0SecondUnit)
  }

  /**
   * @param {number} value
   * @return {Level0Day}
   */
  create (value) {
    return new Level0Minute(value, this)
  }
}

export const level0MinuteUnit = new Level0MinuteUnit(level0SecondUnit)
