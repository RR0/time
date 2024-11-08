import { TimeUnit } from "../../unit/index.mjs"
import { Level1MonthValidator } from "./Level1MonthValidator.mjs"
import { level1DayUnit } from "../day/index.mjs"

export const level1MonthUnit = new TimeUnit("month", 1, 12, level1DayUnit, new Level1MonthValidator())
