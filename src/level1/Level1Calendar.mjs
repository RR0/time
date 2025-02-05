import { CalendarUnit } from "../calendar/unit/CalendarUnit.mjs"
import { Level0Calendar } from "../level0/index.mjs"

export class Level1Calendar extends Level0Calendar {

  year = new CalendarUnit("year", -9999, 9999, this.month)
}

export const level1Calendar = new Level1Calendar()
