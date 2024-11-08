import { Level0Month } from "./Level0Month.mjs"
import { MonthUnit } from "../../unit/MonthUnit.mjs"

export class Level0Months {
  /**
   * @readonly
   * @type {Level0Month}
   */
  static january = new Level0Month(2, MonthUnit.Month31)

  /**
   * @readonly
   * @param {number} year
   */
  static February = (year) => new Level0Month(2, MonthUnit.create(2, year))

  /**
   * @readonly
   * @type {Level0Month}
   */
  static march = new Level0Month(3, MonthUnit.Month31)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static april = new Level0Month(4, MonthUnit.Month30)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static may = new Level0Month(5, MonthUnit.Month31)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static june = new Level0Month(6, MonthUnit.Month30)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static july = new Level0Month(7, MonthUnit.Month31)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static august = new Level0Month(8, MonthUnit.Month31)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static september = new Level0Month(9, MonthUnit.Month30)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static october = new Level0Month(10, MonthUnit.Month31)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static november = new Level0Month(11, MonthUnit.Month30)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static december = new Level0Month(12, MonthUnit.Month31)
}
