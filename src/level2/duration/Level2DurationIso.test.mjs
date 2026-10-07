import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Duration } from "./Level2Duration.mjs"
import { Level2DurationParser } from "./Level2DurationParser.mjs"
import { Level2Interval } from "../interval/Level2Interval.mjs"

describe("ISO 8601 durations", () => {
  const parse = (str, strict = false) => {
    const parser = new Level2DurationParser()
    parser.strict = strict
    const spec = Level2Duration.fromString(str, parser).toSpec()
    return Object.fromEntries(["years", "months", "days", "hours", "minutes", "seconds"]
      .filter(unit => spec[unit]).map(unit => [unit, spec[unit].value]))
  }

  for (const strict of [false, true]) {
    describe(strict ? "strict" : "lenient", () => {
      test("P1Y2M3DT4H", () => {
        assert.deepStrictEqual(parse("P1Y2M3DT4H", strict), { years: 1, months: 2, days: 3, hours: 4 })
      })

      test("M is minutes after the T", () => {
        assert.deepStrictEqual(parse("PT30M", strict), { minutes: 30 })
        assert.deepStrictEqual(parse("P1Y2M3DT4H5M6S", strict), { years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6 })
        assert.deepStrictEqual(parse("P1DT2M", strict), { days: 1, minutes: 2 })
      })

      test("M is months before the T", () => {
        assert.deepStrictEqual(parse("P2MT4H", strict), { months: 2, hours: 4 })
        assert.deepStrictEqual(parse("P1Y2MT30M", strict), { years: 1, months: 2, minutes: 30 })
      })

      test("M followed by days is months, as minutes cannot precede days", () => {
        assert.deepStrictEqual(parse("P1Y2M3D", strict), { years: 1, months: 2, days: 3 })
      })

      test("a bare M is minutes", () => {
        assert.deepStrictEqual(parse("P2M", strict), { minutes: 2 })
        assert.deepStrictEqual(parse("P1Y2M", strict), { years: 1, minutes: 2 })
        assert.deepStrictEqual(parse("P2M30S", strict), { minutes: 2, seconds: 30 })
        assert.strictEqual(Level2Duration.fromString("P225H15M3S").value, ((225 * 60 + 15) * 60 + 3) * 1000)
      })

      test("MM is months", () => {
        assert.deepStrictEqual(parse("P2MM", strict), { months: 2 })
        assert.deepStrictEqual(parse("P1Y2MM", strict), { years: 1, months: 2 })
      })
    })
  }

  test("garbage after a valid duration is only rejected in strict mode", () => {
    assert.deepStrictEqual(parse("P1Yjunk"), { years: 1 })
    assert.throws(() => parse("P1Yjunk", true))
  })

  test("rendering is read back unchanged", () => {
    for (const str of ["PT30M", "P1YT30M", "P2M30S", "P225H15M3S", "P1Y2M3DT4H", "P2MM", "P1Y2M3D", "P2M"]) {
      const duration = Level2Duration.fromString(str)
      assert.deepStrictEqual(Level2Duration.fromString(duration.toString()).toSpec(), duration.toSpec(), str)
    }
    assert.strictEqual(Level2Duration.fromString("P1Y2M3DT4H").toString(), "P1Y2MM3D4H")
    assert.strictEqual(Level2Duration.fromString("PT30M").toString(), "P30M")
  })

  test("intervals of ISO durations", () => {
    const interval = Level2Interval.fromString("P1Y2M3DT4H/P2Y")
    assert.deepStrictEqual(interval.start.toSpec().months.value, 2)
    assert.deepStrictEqual(interval.start.toSpec().hours.value, 4)
    assert.deepStrictEqual(interval.end.toSpec().years.value, 2)
  })
})
