import { describe, test } from "node:test"
import assert, { fail } from "node:assert"
import { Level0Second } from "./Level0Second.mjs"
import { level0Calendar } from "../Level0Calendar.mjs"

describe("Level0Second", () => {

  test("certain", () => {
    const seconds = Level0Second.fromString("44")
    assert.equal(seconds.value, 44)
  })

  test("toString", () => {
    assert.equal(new Level0Second(9).toString(), "09")
    assert.equal(new Level0Second(44).toString(), "44")
  })

  test("minimum", () => {
    const minutes = Level0Second.fromString("00")
    assert.equal(minutes.value, 0)
  })

  test("maximum", () => {
    const minutes = Level0Second.fromString("59")
    assert.equal(minutes.value, 59)
  })

  test("negative", () => {
    assert.throws(() => Level0Second.fromString("-1"), { message: "secondValue cannot be negative" })
  })

  test("too high", () => {
    assert.throws(() => Level0Second.fromString("60"), { message: "second value must be >= 0 and <= 59, but was 60" })
  })

  const secondValue = 20

  describe("prev", () => {

    test("valid", () => {
      const second = new Level0Second(secondValue)
      const next = second.previous()
      assert.equal(next.value, secondValue - 1)
    })

    test("overflow", () => {
      const second = new Level0Second(level0Calendar.second.min)
      try {
        second.previous()
        fail("Should not allow next month before min")
      } catch (e) {
        assert.equal(e.message, "second value must be >= 0 and <= 59, but was -1")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const second = new Level0Second(secondValue)
      const next = second.next()
      assert.equal(next.value, secondValue + 1)
    })

    test("overflow", () => {
      const second = new Level0Second(level0Calendar.second.max)
      try {
        second.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "second value must be >= 0 and <= 59, but was 60")
      }
    })
  })
})
