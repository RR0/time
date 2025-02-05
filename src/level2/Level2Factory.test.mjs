import { describe, test } from "node:test"
import assert from "node:assert"
import { level2Factory, Level2Factory } from "./Level2Factory.mjs"

describe("Level2Factory", () => {

  describe("year", () => {

    test("new normal", () => {
      const year = level2Factory.newYear(1985)
      assert.equal(year.value, 1985)
    })

    test("negative", () => {
      const year = level2Factory.newYear(-11)
      assert.equal(year.value, -11)
    })
  })
})
