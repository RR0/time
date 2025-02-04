import { Level1YearValidator } from "./Level1YearValidator.mjs"
import { level1MonthUnit } from "../month/index.mjs"
import { Level0YearUnit } from "../../level0/year/Level0YearUnit.mjs"

export const level1YearUnit = new Level0YearUnit(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, level1MonthUnit, new Level1YearValidator())
