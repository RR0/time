import { CalendarUnit } from "../calendar/unit/CalendarUnit.mjs"
import { Level1Calendar } from "../level1/Level1Calendar.mjs"

export class Level2Calendar extends Level1Calendar {

  year = new CalendarUnit("year", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.month)
}

export const level2Calendar = new Level2Calendar()
