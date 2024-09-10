import { describe, test } from "node:test"
import assert from "node:assert"
import Level0Second from "./Level0Second.mjs"

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
    try {
      Level0Second.fromString("-1")
      assert.fail("Should not be allow negative seconds")
    } catch (e) {
      assert.equal(e.message, `secondValue cannot be negative`)
    }
  })

  test("too high", () => {
    try {
      Level0Second.fromString("60")
      assert.fail("Should not be allowed")
    } catch (e) {
      assert.equal(e.message, "second value must be >= 0 and <= 59")
    }
  })
})
