import { describe, test } from "node:test"
import assert from "node:assert"
import { Level1Date } from "../date/Level1Date.mjs"
import { level0TimeUnits } from "../../level0/unit/Level0TimeUnits.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"
import { Level1Duration } from "./Level1Duration.mjs"
import { level1DurationFactory } from "../Level1Factory.mjs"
import { level1SecondUnit } from "../second/index.mjs"
import { level1DayUnit } from "../day/index.mjs"
import { level1YearUnit } from "../year/index.mjs"
import { level1MonthUnit } from "../month/index.mjs"
import { level1MinuteUnit } from "../minute/index.mjs"
import { Level0Date, level031DayUnit, Level0Duration, level0MonthUnit, level0YearUnit } from "../../level0/index.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * level1MinuteUnit.duration) + (seconds * level1SecondUnit.duration)
    const duration = new Level1Duration(value)
    const expectedSpec = /** @type Level1DurationOutSpec */ {
      seconds: level1DurationFactory.newSecond(seconds),
      minutes: level1DurationFactory.newMinute(minutes),
      uncertain: false,
      approximate: false
    }
    const durationSpec = duration.toSpec()
    assert.deepEqual(durationSpec, expectedSpec)
    const durationStaticSpec = Level1Duration.toSpec(duration)
    assert.deepEqual(durationStaticSpec, expectedSpec)
  })

  describe("rendering", () => {

    test("default", () => {
      const seconds = 3
      const toString = `P${seconds}S`
      const durationMs = new Level1Duration({ seconds })
      assert.equal(durationMs.toString(), toString)
    })

    test("custom", () => {
      const customRenderer = new class extends Level1DurationRenderer {
        render (comp) {
          const value = comp.value / level1SecondUnit.duration
          return (comp.uncertain ? "maybe " : "") + "during " + value + " second" + (value > 1 ? "s" : "") + (comp.approximate ? " approximately" : "")
        }
      }()
      const duration = new Level1Duration({ seconds: level1SecondUnit.min + 1 })
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
      const durationMs = Level1Duration.fromString(`P${seconds}S`)
      assert.equal(durationMs.value, seconds * level1SecondUnit.duration)
    })

    test("uncertain", () => {
      const durationMs = Level1Duration.fromString(`P${seconds}S?`)
      level1Assert(durationMs, seconds * level1SecondUnit.duration, true)
    })

    test("approximate", () => {
      const durationMs = Level1Duration.fromString(`P${seconds}S~`)
      level1Assert(durationMs, seconds * level1SecondUnit.duration, false, true)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level1Duration(seconds * level1SecondUnit.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level1Duration(minutes * level1MinuteUnit.duration + seconds * level1SecondUnit.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  describe("between", { todo: true }, () => {

    test("days", () => {
      const beforeDate = Level1Date.fromString("1985-04-21")
      const afterDate = Level1Date.fromString("1985-04-23")
      const twoDays = Level1Duration.between(beforeDate, afterDate)
      assert.equal(twoDays.value, 2 * level1DayUnit.duration)
    })

    test("months", () => {
      const beforeDate = Level1Date.fromString("1985-04")
      const afterDate = Level1Date.fromString("1985-06")
      const between = Level1Duration.between(beforeDate, afterDate)
      const expected = (6 - 4) * level1MonthUnit.duration
      assert.equal(between.value, expected)
    })

    test("years", () => {
      const beforeDate = Level1Date.fromString("1985")
      const afterDate = Level1Date.fromString("1987")
      const between = Level1Duration.between(beforeDate, afterDate)
      const expected = (1987 - 1985) * level1YearUnit.duration
      assert.equal(between.value, expected)
    })

    test("years + months", () => {
      const beforeDate = Level1Date.fromString("1985-04")
      const afterDate = Level1Date.fromString("1987-06")
      const between = Level1Duration.between(beforeDate, afterDate)
      const expected = ((1987 - 1985) * level1YearUnit.duration) + ((6 - 4) * level1MonthUnit.duration)
      assert.equal(between.value, expected)
    })

    test("other", () => {
      const beforeDate = Level1Date.fromString("1985-04-21")
      const afterDate = Level1Date.fromString("2001")
      const years = Level1Duration.between(beforeDate, afterDate)
      const expected = ((2001 - 1985) * level1YearUnit.duration) - ((12 - 8) * level1MonthUnit.duration) - (21 * level1DayUnit.duration)
      assert.equal(years.value, expected)
    })
  })

})
