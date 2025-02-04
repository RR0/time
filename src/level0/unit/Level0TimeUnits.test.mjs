import { describe, test } from "node:test"
import assert from "node:assert"
import { level0HourUnit, level0MillisecondUnit, level0MinuteUnit, level0SecondUnit, level0YearUnit } from "../index.mjs"
import { MonthUnit } from "../../unit/index.mjs"
import { Level0YearUnit } from "../year/Level0YearUnit.mjs"
import { level031DayUnit } from "../day/Level0DayUnit.mjs"

describe("GregorianCalendar", () => {

  test("millis duration", () => {
    assert.equal(level0MillisecondUnit.duration, 1)
  })

  test("second duration", () => {
    assert.equal(level0SecondUnit.duration, 1000 * level0MillisecondUnit.duration)
  })

  test("minute duration", () => {
    assert.equal(level0MinuteUnit.duration, 60 * level0SecondUnit.duration)
  })

  test("hour duration", () => {
    assert.equal(level0HourUnit.duration, 60 * level0MinuteUnit.duration)
  })

  test("day duration", () => {
    assert.equal(level031DayUnit.duration, 24 * level0HourUnit.duration)
  })

  test("28-days month duration", {todo: true}, (x) => {
    assert.equal(Level0YearUnit.Month28.duration, 28 * level031DayUnit.duration)
  })

  test("29-days month duration", {todo: true}, () => {
    assert.equal(Level0YearUnit.Month29.duration, 29 * level031DayUnit.duration)
  })

  test("30-days month duration", {todo: true}, () => {
    assert.equal(Level0YearUnit.Month30.duration, 30 * level031DayUnit.duration)
  })

  test("31-days month duration", () => {
    assert.equal(Level0YearUnit.Month31.duration, 31 * level031DayUnit.duration)
  })

  test("year duration", () => {
    assert.equal(level0YearUnit.duration, 12 * MonthUnit.Month31.duration)
  })
})
