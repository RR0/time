import { Calendar } from "./Calendar.mjs"
import { CalendarUnit } from "./unit/CalendarUnit.mjs"

export class GregorianCalendar extends Calendar {

  millisecond = new CalendarUnit("millisecond", 0, 999, undefined)

  second = new CalendarUnit("second", 0, 59, this.millisecond)

  minute = new CalendarUnit("minute", 0, 59, this.second)

  hour = new CalendarUnit("hour", 0, 23, this.minute)

  day = new CalendarUnit("day", 1, 31, this.hour)

  month = new CalendarUnit("month", 1, 12, this.day)

  year = new CalendarUnit("year", 0, 9999, this.month)
}

export const calendarUnits = new GregorianCalendar()
