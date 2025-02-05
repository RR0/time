import { describe, test } from "node:test"
import assert, { fail } from "node:assert"
import { level0Factory, Level0Factory } from "./Level0Factory.mjs"

describe("Level0Factory", () => {

  describe("year", () => {

    test("new normal", () => {
      const year = level0Factory.newYear(1985)
      assert.equal(year.value, 1985)
    })

    test("negative", () => {
      try {
        const year = level0Factory.newYear(-11)
        fail("Should not be allow negative years")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was -11")
      }
    })

    test("below min", () => {
      try {
        const year = level0Factory.newYear(-1)
        fail("Should not be above max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was -1")
      }
    })

    test("above max", () => {
      try {
        const year = level0Factory.newYear(10000)
        fail("Should not be above max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was 10000")
      }
    })
  })
})
