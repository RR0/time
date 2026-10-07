import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Date } from "./level0/date/Level0Date.mjs"
import { Level1Date } from "./level1/date/Level1Date.mjs"
import { Level2Date } from "./level2/date/Level2Date.mjs"
import { Level0Timeshift } from "./level0/timeshift/Level0Timeshift.mjs"
import { Level1Timeshift } from "./level1/timeshift/Level1Timeshift.mjs"
import { Level2Timeshift } from "./level2/timeshift/Level2Timeshift.mjs"

describe("clone() keeps the timeshift", () => {
  for (const [name, DateClass, TimeshiftClass, str] of [
    ["level 0", Level0Date, Level0Timeshift, "2023-03-14T09:12:33+01:00"],
    ["level 1", Level1Date, Level1Timeshift, "2023-03-14T09:12:33+01:00"],
    ["level 2", Level2Date, Level2Timeshift, "2023-03-14T09:12:33-07:00"]
  ]) {
    test(name, () => {
      const date = DateClass.fromString(str)
      const clone = date.clone()
      assert.ok(clone.timeshift instanceof TimeshiftClass)
      assert.strictEqual(clone.timeshift.value, date.timeshift.value)
      assert.strictEqual(clone.toString(), date.toString())
      assert.ok(!clone.toString().includes("[object"))
    })
  }

  test("a Z date is cloned as Z", () => {
    const date = Level2Date.fromString("2023-03-14T09:12:33.123Z")
    assert.strictEqual(date.clone().toString(), "2023-03-14T09:12:33.123Z")
  })

  test("a timeshift spec can be assigned", () => {
    const date = Level2Date.fromString("2023-03-14T09:12:33Z")
    date.timeshift = { value: 60 }
    assert.strictEqual(date.timeshift.value, 60)
  })
})
