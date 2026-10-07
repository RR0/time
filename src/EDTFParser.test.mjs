import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Date } from "./level2/date/Level2Date.mjs"
import { Level2DateParser } from "./level2/date/Level2DateParser.mjs"
import { Level2Timeshift } from "./level2/timeshift/Level2Timeshift.mjs"
import { Level2Duration } from "./level2/duration/Level2Duration.mjs"
import { Level2Interval } from "./level2/interval/Level2Interval.mjs"
import { EDTFError } from "./EDTFError.mjs"

describe("EDTFParser", () => {
  const garbage = ["1948abc", "x1948", "1965-07-", "1965-07-01T05:", "1948-07-24T02:45:30junk", "1948-07-24T02:45:30.Z"]

  describe("requires the whole string to match", () => {
    for (const str of garbage) {
      test(`rejects "${str}"`, () => {
        assert.throws(() => Level2Date.fromString(str), EDTFError)
        assert.throws(() => Level2Date.fromString(str, new Level2DateParser()), EDTFError)
      })
    }

    test("accepts milliseconds (Medium's article:published_time)", () => {
      assert.strictEqual(Level2Date.fromString("2023-03-14T09:12:33.123Z").millisecond.value, 123)
    })

    for (const str of ["1948", "1948-07", "1948-07-24", "1948-07-24T02:45", "1948-07-24T02:45:30", "1948-07-24T02:45:30Z",
      "1948-07-24T02:45:30+01", "1948-07-24T02:45:30+01:00", "1948~", "1948?"]) {
      test(`still accepts "${str}"`, () => {
        assert.ok(Level2Date.fromString(str))
      })
    }

    test("accepts what reads as a string", () => {
      assert.strictEqual(Level2Date.fromString(Level2Date.fromString("2023-03-14T09:12:33Z")).toString(), "2023-03-14T09:12:33Z")
    })

    test("applies to duration parsers", () => {
      assert.strictEqual(Level2Duration.fromString("P1Y2M").toSpec().minutes.value, 2)
      assert.throws(() => Level2Duration.fromString("P1Yjunk"), EDTFError)
      assert.throws(() => Level2Duration.fromString("P1Y2M3Z"), EDTFError)
    })

    test("applies to other parsers", () => {
      assert.strictEqual(Level2Timeshift.fromString("+01:00").value, 60)
      assert.throws(() => Level2Timeshift.fromString("+01:00junk"), EDTFError)
    })

    test("applies to intervals", () => {
      assert.ok(Level2Interval.fromString("1948/1949"))
      assert.throws(() => Level2Interval.fromString("1948/1949junk"), EDTFError)
    })
  })
})
