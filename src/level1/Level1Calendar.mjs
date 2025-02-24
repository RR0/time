import { CalendarUnit } from "../calendar/unit/CalendarUnit.mjs"
import { Level0Calendar } from "../level0/index.mjs"

export class Level1Calendar extends Level0Calendar {

  year = new CalendarUnit("year", -9999, 9999, this.month)

  yearExtended = new CalendarUnit("year", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.month)
}

export const level1Calendar = new Level1Calendar()
