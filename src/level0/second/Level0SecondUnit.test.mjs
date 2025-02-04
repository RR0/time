import { describe, test } from "node:test"
import assert from "node:assert"
import { level0SecondUnit } from "./Level0SecondUnit.mjs"

describe("Level0SecondUnit", () => {

  test("iteration", () => {
    const values = []
    for (const level0SecondValue of level0SecondUnit) {
      values.push(level0SecondValue)
    }
    assert.equal(values.length, 60)
    for (let i = 0; i < values.length; i++) {
      assert.equal(values[i], i)
    }
  })
})
