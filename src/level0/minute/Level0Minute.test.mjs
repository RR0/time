import { describe, test } from "node:test"
import assert from "node:assert"
import Level0Minute from "./Level0Minute.mjs"

describe("Level0Minute", () => {

  test("certain", () => {
    const minutes = Level0Minute.fromString("56")
    assert.equal(minutes.value, 56)
  })

  test("toString", () => {
    assert.equal(new Level0Minute(9).toString(), "09")
    assert.equal(new Level0Minute(59).toString(), "59")
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
    try {
      Level0Minute.fromString("-1")
      assert.fail("Should not allow negative minutes")
    } catch (e) {
      assert.equal(e.message, `minuteValue cannot be negative`)
    }
  })

  test("too high", () => {
    try {
      Level0Minute.fromString("60")
      assert.fail("Should not be allowed")
    } catch (e) {
      assert.equal(e.message, "minute value must be >= 0 and <= 59")
    }
  })
})
