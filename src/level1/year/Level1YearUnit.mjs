import { TimeUnit } from "../../unit/index.mjs"
import { Level1YearValidator } from "./Level1YearValidator.mjs"
import { level1MonthUnit } from "../month/index.mjs"

export const level1YearUnit = new TimeUnit("year", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, level1MonthUnit, new Level1YearValidator())
