import { describe, test } from "node:test"
import assert from "node:assert"
import { Level1Date } from "../date/Level1Date.mjs"
import { level0Calendar } from "../../level0/Level0Calendar.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"
import { Level1Duration } from "./Level1Duration.mjs"
import { level1DurationFactory } from "../Level1Factory.mjs"

describe("Duration", () => {

  test("toSpec", () => {
    const minutes = 2
    const seconds = 3
    const value = (minutes * level0Calendar.minute.duration) + (seconds * level0Calendar.second.duration)
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
        render(comp) {
          const value = comp.value / level0Calendar.second.duration
          return (comp.uncertain ? "maybe " : "") + "during " + value + " second" + (value > 1 ? "s" : "") + (comp.approximate ? " approximately" : "")
        }
      }()
      const duration = new Level1Duration({ seconds: level0Calendar.second.min + 1 })
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
      assert.equal(durationMs.value, seconds * level0Calendar.second.duration)
    })

    test("uncertain", () => {
      const durationMs = Level1Duration.fromString(`P${seconds}S?`)
      level1Assert(durationMs, seconds * level0Calendar.second.duration, true)
    })

    test("approximate", () => {
      const durationMs = Level1Duration.fromString(`P${seconds}S~`)
      level1Assert(durationMs, seconds * level0Calendar.second.duration, false, true)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level1Duration(seconds * level0Calendar.second.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level1Duration(minutes * level0Calendar.minute.duration + seconds * level0Calendar.second.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level1Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  test("between", { todo: true }, () => {
    const beforeDate = Level1Date.fromString("1985-04-21")
    const twoDays = Level1Duration.between(beforeDate, Level1Date.fromString("1985-04-23"))
    assert.equal(twoDays.value, 2 * level0Calendar.day.duration)
    const years = Level1Duration.between(beforeDate, Level1Date.fromString("2001"))
    const expected = ((2001 - 1985) * level0Calendar.year.duration) - (8 * level0Calendar.month.duration) - (7 * level0Calendar.day.duration)
    assert.equal(years.value, expected)
  })
})
