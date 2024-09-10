import { describe, test } from "node:test"
import assert from "node:assert"
import level0 from "./index.mjs"

describe("Level0", () => {

  describe("construction", () => {

    test("current date", () => {
      const certain = level0.Date.newInstance()
      assert.ok(certain.year)
      assert.ok(certain.month)
      assert.ok(certain.day)
    })

    test("incorrect EDTF", () => {
      try {
        level0.Date.fromString("incorrect")
      } catch (e) {
        assert.equal(e.message, `Invalid date "incorrect"`)
      }
    })

    test("complete date", () => {
      const uncertainDay = level0.Date.fromString("1985-04-12")
      assert.equal(uncertainDay.year.value, 1985)
    })

    test("year", () => {
      const year = new level0.Year()
      assert.ok(year)
    })

    test("month", () => {
      const month = new level0.Month()
      assert.ok(month)
    })

    test("day", () => {
      const day = new level0.Day()
      assert.ok(day)
    })

    test("date", () => {
      const date = new level0.Date()
      assert.ok(date)
    })
  })
})
