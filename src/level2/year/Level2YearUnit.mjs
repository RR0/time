import { TimeUnit } from "../../unit/index.mjs"
import { level0TimeUnits } from "../../level0/index.mjs"
import { Level1YearValidator } from "../../level1/year/Level1YearValidator.mjs"
import { level2MonthUnit } from "../month/index.mjs"

export const level2YearUnit = new TimeUnit(level0TimeUnits.year.name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, level2MonthUnit, new Level1YearValidator())
