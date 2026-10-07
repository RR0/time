import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Date } from "./level2/date/Level2Date.mjs"
import { Level2DateParser } from "./level2/date/Level2DateParser.mjs"
import { Level2Timeshift } from "./level2/timeshift/Level2Timeshift.mjs"
import { Level2TimeshiftParser } from "./level2/timeshift/Level2TimeshiftParser.mjs"
import { Level2Duration } from "./level2/duration/Level2Duration.mjs"
import { Level2DurationParser } from "./level2/duration/Level2DurationParser.mjs"
import { EDTFError } from "./EDTFError.mjs"

describe("EDTFParser strictness", () => {
  const garbage = ["1948abc", "x1948", "1965-07-", "1965-07-01T05:", "1948-07-24T02:45:30junk"]

  test("is lenient by default (backward compatible)", () => {
    const parser = new Level2DateParser()
    assert.strictEqual(parser.strict, false)
    assert.strictEqual(Level2Date.fromString("1948abc", parser).year.value, 1948)
    assert.strictEqual(Level2Date.fromString("2023-03-14T09:12:33.123Z", parser).second.value, 33)
    assert.strictEqual(Level2Date.fromString("2023-03-14T09:12:33junk", parser).second.value, 33)
  })

  describe("strict", () => {
    const strictParser = () => {
      const parser = new Level2DateParser()
      parser.strict = true
      return parser
    }

    for (const str of garbage) {
      test(`rejects "${str}"`, () => {
        assert.throws(() => Level2Date.fromString(str, strictParser()), EDTFError)
      })
    }

    test("accepts milliseconds (Medium's article:published_time)", () => {
      assert.strictEqual(Level2Date.fromString("2023-03-14T09:12:33.123Z", strictParser()).millisecond.value, 123)
    })

    for (const str of ["1948", "1948-07", "1948-07-24", "1948-07-24T02:45", "1948-07-24T02:45:30", "1948-07-24T02:45:30Z",
      "1948-07-24T02:45:30+01", "1948-07-24T02:45:30+01:00", "1948~", "1948?"]) {
      test(`still accepts "${str}"`, () => {
        assert.ok(Level2Date.fromString(str, strictParser()))
      })
    }

    test("accepts what reads as a string, like exec() does", () => {
      const parser = strictParser()
      assert.strictEqual(Level2Date.fromString(Level2Date.fromString("2023-03-14T09:12:33Z"), parser).toString(), "2023-03-14T09:12:33Z")
    })

    test("applies to duration parsers", () => {
      const parser = new Level2DurationParser()
      parser.strict = true
      assert.strictEqual(Level2Duration.fromString("P1Y2M", parser).toSpec().minutes.value, 2)
      assert.throws(() => Level2Duration.fromString("P1Yjunk", parser), EDTFError)
    })

    test("applies to other parsers", () => {
      const parser = new Level2TimeshiftParser()
      parser.strict = true
      assert.strictEqual(Level2Timeshift.fromString("+01:00", parser).value, 60)
      assert.throws(() => Level2Timeshift.fromString("+01:00junk", parser), EDTFError)
    })
  })
})
