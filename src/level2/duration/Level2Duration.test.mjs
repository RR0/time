import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Date } from "../date/index.mjs"
import { Level2DurationRenderer } from "./Level2DurationRenderer.mjs"
import { Level2Duration } from "./Level2Duration.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"
import { level2DurationFactory } from "../Level2Factory.mjs"
import { level2MinuteUnit } from "../minute/Level2MinuteUnit.mjs"
import { level2SecondUnit } from "../second/Level2SecondUnit.mjs"
import { level2DayUnit } from "../day/index.mjs"
import { level2YearUnit } from "../year/index.mjs"
import { level2MonthUnit } from "../month/index.mjs"
import { Level0Date, level031DayUnit, Level0Duration, level0MonthUnit, level0YearUnit } from "../../level0/index.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * level2MinuteUnit.duration) + (seconds * level2SecondUnit.duration)
    const duration = new Level2Duration(value)
    const expectedSpec = /** @type Level2DurationOutSpec */ {
      seconds: level2DurationFactory.newSecond(seconds),
      minutes: level2DurationFactory.newMinute(minutes),
      uncertain: false,
      approximate: false
    }
    const durationSpec = duration.toSpec()
    assert.deepEqual(durationSpec, expectedSpec)
    const durationStaticSpec = Level2Duration.toSpec(duration)
    assert.deepEqual(durationStaticSpec, expectedSpec)
    const durationStaticSpec2 = Level2Duration.toSpec(duration.value)
    assert.deepEqual(durationStaticSpec2, expectedSpec)
    const twelveMinutes = Level2Duration.toSpec(12 * level2MinuteUnit.duration)
    assert.deepEqual(twelveMinutes.minutes.value, 12)
    const twelveMinutesBefore = Level2Duration.toSpec(-12 * level2MinuteUnit.duration)
    assert.deepEqual(twelveMinutesBefore.minutes.value, -12)
  })

  describe("rendering", () => {

    test("default", () => {
      const seconds = 3
      const toString = `P${seconds}S`
      const durationMs = new Level2Duration({ seconds })
      assert.equal(durationMs.toString(), toString)
    })

    test("custom", () => {
      const customRenderer = new class extends Level2DurationRenderer {
        render (comp) {
          const value = comp.value / level2SecondUnit.duration
          return (comp.uncertain ? "maybe " : "") + "during " + value + " second" + (value > 1 ? "s" : "") + (comp.approximate ? " approximately" : "")
        }
      }()
      const duration = new Level2Duration({ seconds: level2SecondUnit.min + 1 })
      assert.equal(duration.toString(customRenderer), "during 1 second")
      duration.uncertain = true
      assert.equal(duration.toString(customRenderer), "maybe during 1 second")
      duration.approximate = true
      assert.equal(duration.toString(customRenderer), "maybe during 1 second approximately")
      duration.uncertain = false
      assert.equal(duration.toString(customRenderer), "during 1 second approximately")
    })
  })

  describe("parsing", () => {

    const seconds = 3

    test("in seconds", () => {
      const durationMs = Level2Duration.fromString(`P${seconds}S`)
      assert.equal(durationMs.value, seconds * level2SecondUnit.duration)
    })

    test("approximate component", () => {
      const durationMs = Level2Duration.fromString(`P~${seconds}S`)
      level2Assert(durationMs, seconds * level2SecondUnit.duration, false, true)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level2Duration(seconds * level2SecondUnit.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level2Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level2Duration((minutes * level2MinuteUnit.duration) + (seconds * level2SecondUnit.duration))
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level2Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  describe("between", { todo: true }, () => {

    test("days", () => {
      const beforeDate = Level2Date.fromString("1985-04-21")
      const afterDate = Level2Date.fromString("1985-04-23")
      const twoDays = Level2Duration.between(beforeDate, afterDate)
      assert.equal(twoDays.value, 2 * level2DayUnit.duration)
    })

    test("months", () => {
      const beforeDate = Level2Date.fromString("1985-04")
      const afterDate = Level2Date.fromString("1985-06")
      const between = Level2Duration.between(beforeDate, afterDate)
      const expected = (6 - 4) * level2MonthUnit.duration
      assert.equal(between.value, expected)
    })

    test("years", () => {
      const beforeDate = Level2Date.fromString("1985")
      const afterDate = Level2Date.fromString("1987")
      const between = Level2Duration.between(beforeDate, afterDate)
      const expected = (1987 - 1985) * level2YearUnit.duration
      assert.equal(between.value, expected)
    })

    test("years + months", () => {
      const beforeDate = Level2Date.fromString("1985-04")
      const afterDate = Level2Date.fromString("1987-06")
      const between = Level2Duration.between(beforeDate, afterDate)
      const expected = ((1987 - 1985) * level2YearUnit.duration) + ((6 - 4) * level2MonthUnit.duration)
      assert.equal(between.value, expected)
    })

    test("other", () => {
      const beforeDate = Level2Date.fromString("1985-04-21")
      const afterDate = Level2Date.fromString("2001")
      const years = Level2Duration.between(beforeDate, afterDate)
      const expected = ((2001 - 1985) * level2YearUnit.duration) - ((12 - 8) * level2MonthUnit.duration) - (21 * level2DayUnit.duration)
      assert.equal(years.value, expected)
    })
  })

})
