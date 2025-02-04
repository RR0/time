import { Level1YearValidator } from "../../level1/year/Level1YearValidator.mjs"
import { level2MonthUnit } from "../month/index.mjs"
import { Level0YearUnit } from "../../level0/year/Level0YearUnit.mjs"

export const level2YearUnit = new Level0YearUnit(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, level2MonthUnit, new Level1YearValidator())
