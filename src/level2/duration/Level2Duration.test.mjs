import { describe, test } from "node:test"
import assert from "node:assert"
import { level0Calendar } from "../../calendar/index.mjs"
import { Level2Date } from "../date/index.mjs"
import { Level2DurationRenderer } from "./Level2DurationRenderer.mjs"
import { Level2Duration } from "./Level2Duration.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"
import { level2DurationFactory } from "../Level2Factory.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * level0Calendar.minute.duration) + (seconds * level0Calendar.second.duration)
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
    const twelveMinutes = Level2Duration.toSpec(12 * level0Calendar.minute.duration)
    assert.deepEqual(twelveMinutes.minutes.value, 12)
    const twelveMinutesBefore = Level2Duration.toSpec(-12 * level0Calendar.minute.duration)
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
        render(comp) {
          const value = comp.value / level0Calendar.second.duration
          return (comp.uncertain ? "maybe " : "") + "during " + value + " second" + (value > 1 ? "s" : "") + (comp.approximate ? " approximately" : "")
        }
      }()
      const duration = new Level2Duration({ seconds: level0Calendar.second.min + 1 })
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

    const seconds = 90

    test("in seconds", () => {
      const durationMs = Level2Duration.fromString(`P${seconds}S`)
      assert.equal(durationMs.value, seconds * level0Calendar.second.duration)
    })

    test("approximate component", () => {
      const durationMs = Level2Duration.fromString(`P~${seconds}S`)
      level2Assert(durationMs, seconds * level0Calendar.second.duration, false, true)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level2Duration(seconds * level0Calendar.second.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level2Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level2Duration(minutes * level0Calendar.minute.duration + seconds * level0Calendar.second.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level2Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  test("between", { todo: true }, () => {
      const beforeDate = Level2Date.fromString("1985-04-21")
      const twoDays = Level2Duration.between(beforeDate, Level2Date.fromString("1985-04-23"))
      assert.equal(twoDays.value, 2 * level0Calendar.day.duration)
      const years = Level2Duration.between(beforeDate, Level2Date.fromString("2001"))
      const expected = ((2001 - 1985) * level0Calendar.year.duration) - (8 * level0Calendar.month.duration) - (7 * level0Calendar.day.duration)
      assert.equal(years.value, expected)
    }
  )
})
