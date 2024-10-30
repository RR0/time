import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Duration } from "./Level0Duration.mjs"
import { Level0Date } from "../date/index.mjs"
import { calendarUnits } from "../../calendar/index.mjs"
import { Level0ComponentRenderer } from "../component/Level0ComponentRenderer.mjs"
import { level0DurationFactory } from "../Level0Factory.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * calendarUnits.minute.duration) + (seconds * calendarUnits.second.duration)
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
      assert.equal(level0DurationFactory.newMinute(calendarUnits.second.min).toString(customRenderer), "0 second")
      assert.equal(level0DurationFactory.newMinute(calendarUnits.second.min + 1).toString(customRenderer), "1 second")
      assert.equal(level0DurationFactory.newMinute(calendarUnits.second.max).toString(customRenderer), "59 seconds")
    })
  })

  describe("parsing", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = Level0Duration.fromString(`P${seconds}S`)
      assert.equal(durationMs.value, seconds * calendarUnits.second.duration)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const threeSeconds = new Level0Duration(seconds * calendarUnits.second.duration)
      assert.equal(threeSeconds.value, 3 * calendarUnits.second.duration)
      const durationObj = new Level0Duration({ seconds })
      assert.equal(durationObj.value, 3 * calendarUnits.second.duration)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level0Duration(minutes * calendarUnits.minute.duration + seconds * calendarUnits.second.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level0Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  test("between", { todo: true }, () => {
    const beforeDate = Level0Date.fromString("1985-04-21")
    const twoDays = Level0Duration.between(beforeDate, Level0Date.fromString("1985-04-23"))
    assert.equal(twoDays.value, 2 * calendarUnits.day.duration)
    const years = Level0Duration.between(beforeDate, Level0Date.fromString("2001"))
    const expected = ((2001 - 1985) * calendarUnits.year.duration) - (8 * calendarUnits.month.duration) - (7 * calendarUnits.day.duration)
    assert.equal(years.value, expected)
  })
})
