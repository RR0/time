import { describe, test } from "node:test"
import assert from "node:assert"
import { MonthUnit } from "../../unit/index.mjs"
import { level2MinuteUnit } from "../../level2/minute/level2MinuteUnit.mjs"
import { level2HourUnit } from "../../level2/hour/level2HourUnit.mjs"
import { level2MillisecondUnit } from "../second/Level2MillisecondUnit.mjs"
import { level2SecondUnit } from "../second/Level2SecondUnit.mjs"
import { level2DayUnit } from "../day/Level2DayUnit.mjs"
import { level2YearUnit } from "../year/Level2YearUnit.mjs"

describe("GregorianCalendar", () => {

  test("millis duration", () => {
    assert.equal(level2MillisecondUnit.duration, 1)
  })

  test("second duration", () => {
    assert.equal(level2SecondUnit.duration, 1000 * level2MillisecondUnit.duration)
  })

  test("minute duration", () => {
    assert.equal(level2MinuteUnit.duration, 60 * level2SecondUnit.duration)
  })

  test("hour duration", () => {
    assert.equal(level2HourUnit.duration, 60 * level2MinuteUnit.duration)
  })

  test("day duration", () => {
    assert.equal(level2DayUnit.duration, 24 * level2HourUnit.duration)
  })

  test("28-days month duration", { todo: true }, () => {
    assert.equal(MonthUnit.Month28.duration, 28 * level2DayUnit.duration)
  })

  test("29-days month duration", { todo: true }, () => {
    assert.equal(MonthUnit.Month29.duration, 29 * level2DayUnit.duration)
  })

  test("30-days month duration", { todo: true }, () => {
    assert.equal(MonthUnit.Month30.duration, 30 * level2DayUnit.duration)
  })

  test("31-days month duration", () => {
    assert.equal(MonthUnit.Month31.duration, 31 * level2DayUnit.duration)
  })

  test("year duration", () => {
    assert.equal(level2YearUnit.duration, 12 * MonthUnit.Month31.duration)
  })
})
