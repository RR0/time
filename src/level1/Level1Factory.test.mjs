import { describe, test } from "node:test"
import assert, { fail } from "node:assert"
import { level1Factory, Level1Factory } from "./Level1Factory.mjs"

describe("Level1Factory", () => {

  describe("year", () => {

    test("new normal", () => {
      const year = level1Factory.newYear(1985)
      assert.equal(year.value, 1985)
    })

    test("negative", () => {
      const year = level1Factory.newYear(-11)
      assert.equal(year.value, -11)
    })

    test("below min", () => {
      try {
        const year = level1Factory.newYear(-10000)
        fail("Should not be above max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= -9999 and <= 9999, but was -10000")
      }
    })

    test("above max", () => {
      try {
        const year = level1Factory.newYear(10000)
        fail("Should not be above max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= -9999 and <= 9999, but was 10000")
      }
    })
  })
})
