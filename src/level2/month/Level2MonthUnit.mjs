import { Level0MonthUnit } from "../../unit/index.mjs"
import { level2DayUnit } from "../day/index.mjs"
import { Level2MonthValidator } from "./Level2MonthValidator.mjs"

/**
 * @typedef ILevel2Month
 * @extends ILevel1Month
 */

export const level2MonthUnit = new Level0MonthUnit(level2DayUnit, new Level2MonthValidator())
