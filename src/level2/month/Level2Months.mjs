import Level1Months from "../../level1/month/Level1Months.mjs"
import Level2Month from "./Level2Month.mjs"

export default class Level2Months extends Level1Months {
  /**
   * Spring - Northern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static NorthernSpring = new Level2Month(25)

  /**
   * Summer - Northern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static NorthernSummer = new Level2Month(26)

  /**
   * Autumn - Northern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static NorthernAutumn = new Level2Month(27)

  /**
   * Winter - Northern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static NorthernWinter = new Level2Month(28)

  /**
   * Spring - Southern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static SouthernSpring = new Level2Month(29)

  /**
   * Summer - Southern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static SouthernSummer = new Level2Month(30)

  /**
   * Autumn - Southern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static SouthernAutumn = new Level2Month(31)

  /**
   * Winter - Southern Hemisphere
   *
   * @readonly
   * @type {Level2Month}
   */
  static SouthernWinter = new Level2Month(32)

  /**
   * Quarter 1 (3 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quarter1 = new Level2Month(33)

  /**
   * Quarter 2 (3 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quarter2 = new Level2Month(34)

  /**
   * Quarter 3 (3 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quarter3 = new Level2Month(35)

  /**
   * Quarter 4 (3 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quarter4 = new Level2Month(36)

  /**
   * Quadrimester 1 (4 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quadrimester1 = new Level2Month(37)

  /**
   * Quadrimester 2 (4 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quadrimester2 = new Level2Month(38)

  /**
   * Quadrimester 3 (4 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Quadrimester3 = new Level2Month(39)

  /**
   * Semester 1 (4 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Semestral1 = new Level2Month(40)

  /**
   * Semester 2 (4 months in duration)
   *
   * @readonly
   * @type {Level2Month}
   */
  static Semestral2 = new Level2Month(41)
}
