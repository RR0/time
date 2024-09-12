import { Level0Months } from "../../level0/month/Level0Months.mjs"
import { Level1Month } from "./Level1Month.mjs"

export class Level1Months extends Level0Months {
  /**
   * Spring (independent of location)
   *
   * @readonly
   * @type {Level1Month}
   */
  static Spring = new Level1Month(21)

  /**
   * Summer (independent of location)
   *
   * @readonly
   * @type {Level1Month}
   */
  static Summer = new Level1Month(22)

  /**
   * Autumn (independent of location)
   *
   * @readonly
   * @type {Level1Month}
   */
  static Autumn = new Level1Month(23)

  /**
   * Winter (independent of location)
   *
   * @readonly
   * @type {Level1Month}
   */
  static Winter = new Level1Month(24)
}
