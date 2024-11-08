import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Duration } from "./Level0Duration.mjs"
import { Level0Date } from "../date/index.mjs"
import { Level0ComponentRenderer } from "../component/Level0ComponentRenderer.mjs"
import { level0DurationFactory } from "../Level0Factory.mjs"
import { level0MinuteUnit } from "../minute/index.mjs"
import { level0SecondUnit } from "../second/index.mjs"
import { level031DayUnit } from "../day/index.mjs"
import { level0YearUnit } from "../year/index.mjs"
import { level0MonthUnit } from "../month/index.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * level0MinuteUnit.duration) + (seconds * level0SecondUnit.duration)
    const duration = new Level0Duration(value)
    const expectedSpec = {
      seconds: level0DurationFactory.newSecond(seconds),
      minutes: level0DurationFactory.newMinute(minutes)
    }
    const durationSpec = duration.toSpec()
    assert.deepEqual(durationSpec, expectedSpec)
    const durationStaticSpec = Level0Duration.toSpec(duration)
    assert.deepEqual(durationStaticSpec, expectedSpec)
  })

  describe("rendering", () => {

    test("default", () => {
      const threeSecondsStr = `P3S`
      const durationMs = Level0Duration.fromString(threeSecondsStr)
      assert.equal(durationMs.toString(), threeSecondsStr)
    })

    test("custom renderer", () => {
      const customRenderer = new class extends Level0ComponentRenderer {
        render (comp) {
          const value = comp.value
          return value + " second" + (value > 1 ? "s" : "")
        }
      }()
      assert.equal(level0DurationFactory.newMinute(level0SecondUnit.min).toString(customRenderer), "0 second")
      assert.equal(level0DurationFactory.newMinute(level0SecondUnit.min + 1).toString(customRenderer), "1 second")
      assert.equal(level0DurationFactory.newMinute(level0SecondUnit.max).toString(customRenderer), "59 seconds")
    })
  })

  describe("parsing", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = Level0Duration.fromString(`P${seconds}S`)
      assert.equal(durationMs.value, seconds * level0SecondUnit.duration)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const threeSeconds = new Level0Duration(seconds * level0SecondUnit.duration)
      assert.equal(threeSeconds.value, 3 * level0SecondUnit.duration)
      const durationObj = new Level0Duration({ seconds })
      assert.equal(durationObj.value, 3 * level0SecondUnit.duration)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level0Duration((minutes * level0MinuteUnit.duration) + (seconds * level0SecondUnit.duration))
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level0Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  describe("between", { todo: true }, () => {

    test("days", () => {
      const beforeDate = Level0Date.fromString("1985-04-21")
      const afterDate = Level0Date.fromString("1985-04-23")
      const twoDays = Level0Duration.between(beforeDate, afterDate)
      assert.equal(twoDays.value, 2 * level031DayUnit.duration)
    })

    test("months", () => {
      const beforeDate = Level0Date.fromString("1985-04")
      const afterDate = Level0Date.fromString("1985-06")
      const between = Level0Duration.between(beforeDate, afterDate)
      const expected = (6 - 4) * level0MonthUnit.duration
      assert.equal(between.value, expected)
    })

    test("years", () => {
      const beforeDate = Level0Date.fromString("1985")
      const afterDate = Level0Date.fromString("1987")
      const between = Level0Duration.between(beforeDate, afterDate)
      const expected = (1987 - 1985) * level0YearUnit.duration
      assert.equal(between.value, expected)
    })

    test("years + months", () => {
      const beforeDate = Level0Date.fromString("1985-04")
      const afterDate = Level0Date.fromString("1987-06")
      const between = Level0Duration.between(beforeDate, afterDate)
      const expected = ((1987 - 1985) * level0YearUnit.duration) + ((6 - 4) * level0MonthUnit.duration)
      assert.equal(between.value, expected)
    })

    test("other", () => {
      const beforeDate = Level0Date.fromString("1985-04-21")
      const afterDate = Level0Date.fromString("2001")
      const years = Level0Duration.between(beforeDate, afterDate)
      const expected = ((2001 - 1985) * level0YearUnit.duration) - ((12 - 8) * level0MonthUnit.duration) - (21 * level031DayUnit.duration)
      assert.equal(years.value, expected)
    })
  })
})
