import { describe, test } from "node:test"
import assert from "node:assert"

import { Level1Duration } from "./Level1Duration.mjs"
import { Level1Date } from "../date/index.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Duration", () => {

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
          const value = comp.value / GregorianCalendar.second.duration
          return (comp.uncertain ? "maybe " : "") + "during " + value + " second" + (value > 1 ? "s" : "") + (comp.approximate ? " approximately" : "")
        }
      }()
      const duration = new Level1Duration({ seconds: GregorianCalendar.second.min + 1 })
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
      assert.equal(durationMs.value, seconds * GregorianCalendar.second.duration)
    })

    test("uncertain", () => {
      const durationMs = Level1Duration.fromString(`P${seconds}S?`)
      level1Assert(durationMs, seconds * GregorianCalendar.second.duration, true)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level1Duration(seconds * GregorianCalendar.second.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level1Duration(minutes * GregorianCalendar.minute.duration + seconds * GregorianCalendar.second.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  test("between", () => {
    const beforeDate = Level1Date.fromString("1985-04-21")
    const twoDays = Level1Duration.between(beforeDate, Level1Date.fromString("1985-04-23"))
    assert.equal(twoDays.value, 2 * GregorianCalendar.day.duration)
    const years = Level1Duration.between(beforeDate, Level1Date.fromString("2001"))
    const expected = ((2001 - 1985) * GregorianCalendar.year.duration) - (8 * GregorianCalendar.month.duration) - (7 * GregorianCalendar.day.duration)
    // assert.equal(years.millis, expected)
  })
})
