import { Level0Month } from "./Level0Month.mjs"
import { Level0MonthUnit } from "../../unit/index.mjs"
import { Level0YearUnit } from "../year/Level0YearUnit.mjs"

export class Level0Months {
  /**
   * @readonly
   * @type {Level0Month}
   */
  static january = new Level0Month(2, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static march = new Level0Month(3, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static april = new Level0Month(4, Level0YearUnit.Month30)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static may = new Level0Month(5, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static june = new Level0Month(6, Level0YearUnit.Month30)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static july = new Level0Month(7, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static august = new Level0Month(8, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static september = new Level0Month(9, Level0YearUnit.Month30)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static october = new Level0Month(10, Level0YearUnit.Month31)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static november = new Level0Month(11, Level0YearUnit.Month30)
  /**
   * @readonly
   * @type {Level0Month}
   */
  static december = new Level0Month(12, Level0YearUnit.Month31)

  /**
   * @readonly
   * @param {number} year
   */
  static February = (year) => new Level0Month(2, Level0MonthUnit.create(2, year))
}
