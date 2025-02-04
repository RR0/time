import { describe, test } from "node:test"
import assert from "node:assert"
import {
  level1DayUnit,
  level1HourUnit,
  level1MillisecondUnit,
  level1MinuteUnit,
  level1SecondUnit,
  level1YearUnit
} from "../index.mjs"
import { MonthUnit } from "../../unit/index.mjs"

import { Level0YearUnit } from "../../level0/year/Level0YearUnit.mjs"

describe("GregorianCalendar", () => {

  test("millis duration", () => {
    assert.equal(level1MillisecondUnit.duration, 1)
  })

  test("second duration", () => {
    assert.equal(level1SecondUnit.duration, 1000 * level1MillisecondUnit.duration)
  })

  test("minute duration", () => {
    assert.equal(level1MinuteUnit.duration, 60 * level1SecondUnit.duration)
  })

  test("hour duration", () => {
    assert.equal(level1HourUnit.duration, 60 * level1MinuteUnit.duration)
  })

  test("day duration", () => {
    assert.equal(level1DayUnit.duration, 24 * level1HourUnit.duration)
  })

  test("28-days month duration", {todo: true}, () => {
    assert.equal(Level0YearUnit.Month28.duration, 28 * level1DayUnit.duration)
  })

  test("29-days month duration", {todo: true}, () => {
    assert.equal(Level0YearUnit.Month29.duration, 29 * level1DayUnit.duration)
  })

  test("30-days month duration", {todo: true}, () => {
    assert.equal(Level0YearUnit.Month30.duration, 30 * level1DayUnit.duration)
  })

  test("31-days month duration", () => {
    assert.equal(Level0YearUnit.Month31.duration, 31 * level1DayUnit.duration)
  })

  test("year duration", () => {
    assert.equal(level1YearUnit.duration, 12 * MonthUnit.Month31.duration)
  })
})
