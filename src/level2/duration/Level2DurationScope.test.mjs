import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Duration } from "./Level2Duration.mjs"
import { Level2DurationParser } from "./Level2DurationParser.mjs"

describe("Level 2 durations qualification scope", () => {
  const parse = str => {
    const parser = new Level2DurationParser()
    return Level2Duration.fromString(str, parser)
  }

  describe("whole duration", () => {
    for (const str of ["~P10M", "P10M~"]) {
      test(`${str} qualifies the duration, not a component`, () => {
        const duration = parse(str)
        assert.strictEqual(duration.approximateDuration, true)
        assert.strictEqual(duration.approximate, true)
        assert.strictEqual(duration.uncertain, false)
        assert.strictEqual(duration.components.minutes.approximateComponent, false)
        assert.strictEqual(duration.hasQualifiedComponent, false)
      })
    }

    test("uncertain, and uncertain and approximate", () => {
      assert.strictEqual(parse("?P10M").uncertainDuration, true)
      assert.strictEqual(parse("P10M?").uncertainDuration, true)
      const both = parse("%P10M")
      assert.strictEqual(both.uncertainDuration, true)
      assert.strictEqual(both.approximateDuration, true)
      assert.strictEqual(parse("P10M%").approximateDuration, true)
    })

    test("a suffix qualifies the whole duration", () => {
      const duration = parse("P1Y2MM3D~")
      assert.strictEqual(duration.approximateDuration, true)
      assert.strictEqual(duration.components.years.approximateComponent, false)
    })
  })

  describe("component", () => {
    test("P~10M qualifies the minutes, not the duration", () => {
      const duration = parse("P~10M")
      assert.strictEqual(duration.approximateDuration, false)
      assert.strictEqual(duration.approximate, true, "the duration is approximate as a whole summary")
      assert.strictEqual(duration.components.minutes.approximateComponent, true)
      assert.strictEqual(duration.hasQualifiedComponent, true)
    })

    test("only the qualified component is at the component level", () => {
      const first = parse("P~1Y2MM").components
      assert.strictEqual(first.years.approximateComponent, true)
      assert.strictEqual(first.months.approximateComponent, false)
      assert.strictEqual(first.months.approximate, false)
      const second = parse("P1Y~2MM").components
      assert.strictEqual(second.years.approximateComponent, false)
      assert.strictEqual(second.months.approximateComponent, true)
    })

    test("a qualified component qualifies the ones to its left at the group level", () => {
      const years = parse("P1Y~2MM").components.years
      assert.strictEqual(years.approximate, true)
      assert.strictEqual(years.approximateComponent, false)
    })

    test("uncertain component", () => {
      const months = parse("P1Y?2MM").components.months
      assert.strictEqual(months.uncertainComponent, true)
      assert.strictEqual(months.approximateComponent, false)
    })

    test("is kept in toSpec(), without normalizing the units", () => {
      const spec = parse("P~150S").toSpec()
      assert.strictEqual(spec.seconds.value, 150)
      assert.strictEqual(spec.seconds.approximateComponent, true)
      assert.strictEqual(spec.minutes, undefined)
    })
  })

  describe("without qualification", () => {
    test("units are normalized as before", () => {
      const duration = parse("P150S")
      assert.strictEqual(duration.hasQualifiedComponent, false)
      assert.strictEqual(duration.toString(), "P2M30S")
      assert.strictEqual(duration.toSpec().minutes.value, 2)
    })

    test("a duration built from a value has no components", () => {
      assert.strictEqual(new Level2Duration(1000).components, undefined)
    })
  })

  describe("rendering", () => {
    const sameAs = (str, expected = str) => {
      const duration = parse(str)
      assert.strictEqual(duration.toString(), expected)
      const back = parse(duration.toString())
      assert.strictEqual(back.value, duration.value, `${str} value`)
      assert.strictEqual(back.toString(), expected, `${str} round trip`)
      assert.strictEqual(back.approximateDuration, duration.approximateDuration, `${str} whole approximation`)
      assert.strictEqual(back.uncertainDuration, duration.uncertainDuration, `${str} whole uncertainty`)
      assert.deepStrictEqual(Object.fromEntries(Object.entries(back.components ?? {}).map(([name, comp]) => [name, [comp.approximateComponent, comp.uncertainComponent]])),
        Object.fromEntries(Object.entries(duration.components ?? {}).map(([name, comp]) => [name, [comp.approximateComponent, comp.uncertainComponent]])), `${str} components`)
    }

    test("whole duration", () => {
      sameAs("~P10M")
      sameAs("?P1Y2MM")
      sameAs("%P1Y2MM")
    })

    test("a suffix is rendered as a prefix of the whole duration", () => {
      sameAs("P10M~", "~P10M")
    })

    test("components", () => {
      sameAs("P~10M")
      sameAs("P~1Y2MM")
      sameAs("P1Y~2MM")
      sameAs("P1Y?2MM3D")
      sameAs("P~150S")
    })

    test("whole duration and component", () => {
      sameAs("~P1Y?2MM")
      sameAs("P1Y?2MM~", "~P1Y?2MM")
    })

    test("both scopes are told apart", () => {
      assert.notStrictEqual(parse("P~10M").toString(), parse("~P10M").toString())
      assert.notStrictEqual(parse("P~1Y2MM").toString(), parse("P1Y~2MM").toString())
    })
  })
})
