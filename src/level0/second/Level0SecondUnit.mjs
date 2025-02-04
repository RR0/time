import { SecondUnit } from "../../unit/SecondUnit.mjs"
import { level0MillisecondUnit } from "./Level0MillisecondUnit.mjs"
import { Level0Second } from "./Level0Second.mjs"

export class Level0SecondUnit extends SecondUnit {

  constructor () {
    super(level0MillisecondUnit)
  }

  /**
   * @param {number} value
   * @return {Level0Second}
   */
  create (value) {
    return new Level0Second(value, this)
  }
}

export const level0SecondUnit = new Level0SecondUnit()
