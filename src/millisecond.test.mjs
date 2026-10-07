import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Date } from "./level0/date/Level0Date.mjs"
import { Level0DateParser } from "./level0/date/Level0DateParser.mjs"
import { Level1Date } from "./level1/date/Level1Date.mjs"
import { Level1DateParser } from "./level1/date/Level1DateParser.mjs"
import { Level2Date } from "./level2/date/Level2Date.mjs"
import { Level2DateParser } from "./level2/date/Level2DateParser.mjs"
import { Level2Interval } from "./level2/interval/Level2Interval.mjs"

describe("milliseconds", () => {
  const levels = [
    ["level 0", Level0Date, () => new Level0DateParser()],
    ["level 1", Level1Date, () => new Level1DateParser()],
    ["level 2", Level2Date, () => new Level2DateParser()]
  ]

  for (const [name, DateClass, newParser] of levels) {
    describe(name, () => {
      test("parses and renders a Medium-like ISO string", () => {
        const date = DateClass.fromString("2023-03-14T09:12:33.123Z", newParser())
        assert.strictEqual(date.second.value, 33)
        assert.strictEqual(date.millisecond.value, 123)
        assert.strictEqual(date.toString(), "2023-03-14T09:12:33.123Z")
      })

      test("pads the fraction to 3 digits", () => {
        assert.strictEqual(DateClass.fromString("2023-03-14T09:12:33.5Z", newParser()).millisecond.value, 500)
        assert.strictEqual(DateClass.fromString("2023-03-14T09:12:33.007Z", newParser()).toString(), "2023-03-14T09:12:33.007Z")
      })

      test("truncates finer fractions and accepts a comma", () => {
        assert.strictEqual(DateClass.fromString("2023-03-14T09:12:33,123999Z", newParser()).millisecond.value, 123)
      })

      test("has no millisecond when none is given", () => {
        const date = DateClass.fromString("2023-03-14T09:12:33Z", newParser())
        assert.strictEqual(date.millisecond, undefined)
        assert.strictEqual(date.toString(), "2023-03-14T09:12:33Z")
      })

      test("is kept by clone() and toSpec()", () => {
        const date = DateClass.fromString("2023-03-14T09:12:33.123Z", newParser())
        assert.strictEqual(date.clone().millisecond.value, 123)
        assert.deepStrictEqual(date.toSpec().millisecond, { value: 123 })
      })

      test("counts in getTime()", () => {
        const a = DateClass.fromString("2023-03-14T09:12:33Z", newParser())
        const b = DateClass.fromString("2023-03-14T09:12:33.250Z", newParser())
        assert.strictEqual(b.getTime() - a.getTime(), 250)
      })

      test("is accepted in strict mode", () => {
        const parser = newParser()
        parser.strict = true
        assert.strictEqual(DateClass.fromString("2023-03-14T09:12:33.123Z", parser).millisecond.value, 123)
        assert.strictEqual(DateClass.fromString("2023-03-14T09:12:33.123+01:00", parser).millisecond.value, 123)
        assert.throws(() => DateClass.fromString("2023-03-14T09:12:33.Z", parser))
      })
    })
  }

  test("level 2 intervals", () => {
    const interval = Level2Interval.fromString("2023-03-14T09:12:33.1Z/2023-03-14T09:12:34.25Z")
    assert.strictEqual(interval.start.millisecond.value, 100)
    assert.strictEqual(interval.end.millisecond.value, 250)
    assert.strictEqual(interval.toString(), "2023-03-14T09:12:33.100Z/2023-03-14T09:12:34.250Z")
  })
})
