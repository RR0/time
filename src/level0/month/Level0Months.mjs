import Level0Month from "./Level0Month.mjs"
import { GregorianMonth } from "../../calendar/GregorianMonth.mjs"

export default class Level0Months {
  /**
   * @readonly
   * @type {Level0Month}
   */
  static january = new Level0Month(2, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @param {number} year
   */
  static February = (year) => new Level0Month(2, GregorianMonth.create(2, year))

  /**
   * @readonly
   * @type {Level0Month}
   */
  static march = new Level0Month(3, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static april = new Level0Month(4, GregorianMonth.ThirtyDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static may = new Level0Month(5, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static june = new Level0Month(6, GregorianMonth.ThirtyDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static july = new Level0Month(7, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static august = new Level0Month(8, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static september = new Level0Month(9, GregorianMonth.ThirtyDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static october = new Level0Month(10, GregorianMonth.ThirtyOneDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static november = new Level0Month(11, GregorianMonth.ThirtyDays)

  /**
   * @readonly
   * @type {Level0Month}
   */
  static december = new Level0Month(12, GregorianMonth.ThirtyOneDays)
}
