import { describe, test } from "node:test"
import assert, { fail } from "node:assert"
import { Level0Hour } from "./Level0Hour.mjs"
import { level0Calendar } from "../Level0Calendar.mjs"

describe("Level0Hour", () => {

  test("certain", () => {
    const hour = Level0Hour.fromString("08")
    assert.equal(hour.value, 8)
  })

  test("toString", () => {
    assert.equal(new Level0Hour(9).toString(), "09")
    assert.equal(new Level0Hour(23).toString(), "23")
  })

  test("minimum", () => {
    const hour = Level0Hour.fromString("00")
    assert.equal(hour.value, 0)
  })

  test("maximum", () => {
    const hour = Level0Hour.fromString("23")
    assert.equal(hour.value, 23)
  })

  test("negative", () => {
    assert.throws(() => Level0Hour.fromString("-1"), { message: "hourValue cannot be negative" })
  })

  test("too high", () => {
    assert.throws(() => Level0Hour.fromString("24"), { message: "hour value must be >= 0 and <= 23, but was 24" })
  })

  const hourValue = 20

  describe("prev", () => {

    test("valid", () => {
      const hour = new Level0Hour(hourValue)
      const next = hour.previous()
      assert.equal(next.value, hourValue - 1)
    })

    test("overflow", () => {
      const hour = new Level0Hour(level0Calendar.hour.min)
      try {
        hour.previous()
        fail("Should not allow next month before min")
      } catch (e) {
        assert.equal(e.message, "hour value must be >= 0 and <= 23, but was -1")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const hour = new Level0Hour(hourValue)
      const next = hour.next()
      assert.equal(next.value, hourValue + 1)
    })

    test("overflow", () => {
      const dayMax = level0Calendar.hour.max
      const day = new Level0Hour(dayMax)
      try {
        day.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "hour value must be >= 0 and <= 23, but was 24")
      }
    })
  })
})
