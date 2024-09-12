import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Day } from "./Level0Day.mjs"

describe("Level0Day", () => {

  test("certain", () => {
    const day = Level0Day.fromString("30")
    assert.equal(day.value, 30)
  })

  test("toString", () => {
    assert.equal(new Level0Day(9).toString(), "09")
    assert.equal(new Level0Day(30).toString(), "30")
  })
})
