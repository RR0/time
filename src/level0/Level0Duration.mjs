import { CalendarUnit } from "../calendar/unit/CalendarUnit.mjs"
import { TimeUnits } from "../calendar/unit/TimeUnits.mjs"

export class Level0DurationUnits extends TimeUnits {

  millisecond = new CalendarUnit("millisecond", 0, Number.MAX_SAFE_INTEGER, undefined)

  second = new CalendarUnit("second", 0, Number.MAX_SAFE_INTEGER, this.millisecond)

  minute = new CalendarUnit("minute", 0, Number.MAX_SAFE_INTEGER, this.second)

  hour = new CalendarUnit("hour", 0, Number.MAX_SAFE_INTEGER, this.minute)

  day = new CalendarUnit("day", 1, Number.MAX_SAFE_INTEGER, this.hour)

  month = new CalendarUnit("month", 1, Number.MAX_SAFE_INTEGER, this.day)

  year = new CalendarUnit("year", 0, Number.MAX_SAFE_INTEGER, this.month)
}

export const level0DurationUnits = new Level0DurationUnits()
