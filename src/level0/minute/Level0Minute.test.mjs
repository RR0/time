import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level0Minute } from "./Level0Minute.mjs"
import { Level0ComponentRenderer } from "../component/Level0ComponentRenderer.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

describe("Level0Minute", () => {

  test("certain", () => {
    const minutes = Level0Minute.fromString("56")
    assert.equal(minutes.value, 56)
  })

  describe("render", () => {

    test("toString", () => {
      assert.equal(new Level0Minute(level0Calendar.minute.min).toString(), "00")
      assert.equal(new Level0Minute(level0Calendar.minute.min + 1).toString(), "01")
      assert.equal(new Level0Minute(level0Calendar.minute.max).toString(), "59")
    })

    test("custom renderer", () => {
      const customRenderer = new class extends Level0ComponentRenderer {
        render(comp) {
          const value = comp.value
          return value + " minute" + (value > 1 ? "s" : "")
        }
      }()
      assert.equal(new Level0Minute(level0Calendar.minute.min).toString(customRenderer), "0 minute")
      assert.equal(new Level0Minute(level0Calendar.minute.min + 1).toString(customRenderer), "1 minute")
      assert.equal(new Level0Minute(level0Calendar.minute.max).toString(customRenderer), "59 minutes")
    })
  })

  test("minimum", () => {
    const minutes = Level0Minute.fromString("00")
    assert.equal(minutes.value, 0)
  })

  test("maximum", () => {
    const minutes = Level0Minute.fromString("59")
    assert.equal(minutes.value, 59)
  })

  test("negative", () => {
    assert.throws(() => Level0Minute.fromString("-1"), { message: `minuteValue cannot be negative` })
  })

  test("too high", () => {
    assert.throws(() => Level0Minute.fromString("60"), { message: `minute value must be >= 0 and <= 59, but was 60` })
  })

  const minuteValue = 20

  describe("prev", () => {

    test("valid", () => {
      const minute = new Level0Minute(minuteValue)
      const next = minute.previous()
      assert.equal(next.value, minuteValue - 1)
    })

    test("overflow", () => {
      const minute = new Level0Minute(level0Calendar.minute.min)
      try {
        minute.previous()
        fail("Should not allow next month before min")
      } catch (e) {
        assert.equal(e.message, "minute value must be >= 0 and <= 59, but was -1")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const minute = new Level0Minute(minuteValue)
      const next = minute.next()
      assert.equal(next.value, minuteValue + 1)
    })

    test("overflow", () => {
      const minute = new Level0Minute(level0Calendar.minute.max)
      try {
        minute.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "minute value must be >= 0 and <= 59, but was 60")
      }
    })
  })
})
