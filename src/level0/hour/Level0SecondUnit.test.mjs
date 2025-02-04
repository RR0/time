import { describe, test } from "node:test"
import assert from "node:assert"
import { level0HourUnit } from "./Level0HourUnit.mjs"

describe("Level0HourUnit", () => {

  test("iteration", () => {
    const values = []
    for (const level0HourValue of level0HourUnit) {
      values.push(level0HourValue)
    }
    assert.equal(values.length, 24)
    for (let i = 0; i < values.length; i++) {
      assert.equal(values[i], i)
    }
  })
})
