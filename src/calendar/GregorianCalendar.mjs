import { Calendar } from "./Calendar.mjs"
import { CalendarUnit } from "./unit/CalendarUnit.mjs"

export class GregorianCalendar extends Calendar {
  /**
   * @readonly
   * @type CalendarUnit
   */
  static millisecond = new CalendarUnit("millisecond", 0, 999, undefined)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static second = new CalendarUnit("second", 0, 59, GregorianCalendar.millisecond)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static minute = new CalendarUnit("minute", 0, 59, GregorianCalendar.second)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static hour = new CalendarUnit("hour", 0, 23, GregorianCalendar.minute)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static day = new CalendarUnit("day", 1, 31, GregorianCalendar.hour)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static month = new CalendarUnit("month", 1, 12, GregorianCalendar.day)

  /**
   * @readonly
   * @type CalendarUnit
   */
  static year = new CalendarUnit("year", 0, 9999, GregorianCalendar.month)
}
