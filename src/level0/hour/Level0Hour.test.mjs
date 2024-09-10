import { describe, test } from "node:test"
import assert from "node:assert"
import Level0Hour from "./Level0Hour.mjs"

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
    try {
      Level0Hour.fromString("-1")
      assert.fail("Should not allow negative hours")
    } catch (e) {
      assert.equal(e.message, `hourValue cannot be negative`)
    }
  })

  test("too high", () => {
    try {
      Level0Hour.fromString("24")
      assert.fail("Should not allow negative hours > 23")
    } catch (e) {
      assert.equal(e.message, "hour value must be >= 0 and <= 23")
    }
  })
})
