import { describe, test } from "node:test"
import assert from "node:assert"
import { UsDaylightSaving } from "./UsDaylightSaving.mjs"
import { Level0Timeshift } from "./Level0Timeshift.mjs"
import { Level0Date } from "../date/Level0Date.mjs"
import { Level1Date } from "../../level1/date/Level1Date.mjs"
import { Level2Date } from "../../level2/date/Level2Date.mjs"
import { EDTFError } from "../../EDTFError.mjs"

describe("UsDaylightSaving", () => {
  const daylight = (year, month, day, hour) => UsDaylightSaving.isDaylight({ year, month, day, hour })

  describe("rule", () => {
    test("2007 and after: second Sunday of March to first Sunday of November", () => {
      assert.deepStrictEqual(UsDaylightSaving.rule(2009), { start: { month: 3, day: 8 }, end: { month: 11, day: 1 } })
      assert.deepStrictEqual(UsDaylightSaving.rule(2026), { start: { month: 3, day: 8 }, end: { month: 11, day: 1 } })
    })

    test("1987 to 2006: first Sunday of April to last Sunday of October", () => {
      assert.deepStrictEqual(UsDaylightSaving.rule(1995), { start: { month: 4, day: 2 }, end: { month: 10, day: 29 } })
      assert.deepStrictEqual(UsDaylightSaving.rule(2006), { start: { month: 4, day: 2 }, end: { month: 10, day: 29 } })
    })

    test("1976 to 1986: last Sunday of April to last Sunday of October", () => {
      assert.deepStrictEqual(UsDaylightSaving.rule(1980), { start: { month: 4, day: 27 }, end: { month: 10, day: 26 } })
    })

    test("1974 and 1975 started in winter", () => {
      assert.deepStrictEqual(UsDaylightSaving.rule(1974), { start: { month: 1, day: 6 }, end: { month: 10, day: 27 } })
      assert.deepStrictEqual(UsDaylightSaving.rule(1975), { start: { month: 2, day: 23 }, end: { month: 10, day: 26 } })
    })

    test("1967 to 1973: last Sunday of April to last Sunday of October", () => {
      assert.deepStrictEqual(UsDaylightSaving.rule(1969), { start: { month: 4, day: 27 }, end: { month: 10, day: 26 } })
    })

    test("before 1967 there was no common rule", () => {
      assert.strictEqual(UsDaylightSaving.rule(1966), undefined)
    })
  })

  describe("isDaylight", () => {
    test("summer and winter", () => {
      assert.strictEqual(daylight(2009, 7, 19), true)
      assert.strictEqual(daylight(2009, 12, 1), false)
      assert.strictEqual(daylight(2009, 1, 15), false)
    })

    test("transitions occur at 02:00", () => {
      assert.strictEqual(daylight(2009, 3, 8, 1), false)
      assert.strictEqual(daylight(2009, 3, 8, 2), true)
      assert.strictEqual(daylight(2009, 11, 1, 1), true)
      assert.strictEqual(daylight(2009, 11, 1, 2), false)
    })

    test("the day before and after a transition", () => {
      assert.strictEqual(daylight(2009, 3, 7), false)
      assert.strictEqual(daylight(2009, 3, 9), true)
      assert.strictEqual(daylight(2009, 10, 31), true)
      assert.strictEqual(daylight(2009, 11, 2), false)
    })

    test("a time is the middle of the day by default", () => {
      assert.strictEqual(daylight(2009, 3, 8), true)
      assert.strictEqual(daylight(2009, 11, 1), false)
    })

    test("before 1967, it is standard time", () => {
      assert.strictEqual(daylight(1965, 7, 20), false)
    })

    test("a year, month and day are needed", () => {
      assert.throws(() => UsDaylightSaving.isDaylight({ year: 2009, month: 7 }), RangeError)
      assert.throws(() => UsDaylightSaving.isDaylight({}), RangeError)
    })
  })

  describe("Sundays", () => {
    test("for every year", () => {
      for (let year = 1967; year <= 2100; year++) {
        for (const month of [3, 4, 10, 11]) {
          const sundays = []
          for (let day = 1; day <= 31; day++) {
            const date = new Date(Date.UTC(2000, month - 1, day))
            date.setUTCFullYear(year)
            if (date.getUTCMonth() === month - 1 && date.getUTCDay() === 0) {
              sundays.push(day)
            }
          }
          assert.strictEqual(UsDaylightSaving.sunday(year, month, 1), sundays[0], `${year}-${month} first`)
          assert.strictEqual(UsDaylightSaving.sunday(year, month, 2), sundays[1], `${year}-${month} second`)
          assert.strictEqual(UsDaylightSaving.sunday(year, month, -1), sundays[sundays.length - 1], `${year}-${month} last`)
        }
      }
    })
  })
})

describe("time zones that depend on the date", () => {
  const cases = [
    ["PT", "2009-07-19 05:54", -7], ["PT", "2009-12-01 05:54", -8],
    ["MT", "2009-07-19 05:54", -6], ["MT", "2009-12-01 05:54", -7],
    ["CT", "2009-07-19 05:54", -5], ["CT", "2009-12-01 05:54", -6],
    ["ET", "1969-07-20 20:17", -4], ["ET", "1969-12-20 20:17", -5]
  ]

  for (const [name, DateClass] of [["level 0", Level0Date], ["level 1", Level1Date], ["level 2", Level2Date]]) {
    describe(name, () => {
      for (const [zone, time, hours] of cases) {
        test(`${time}${zone} is ${hours >= 0 ? "+" : ""}${hours}`, () => {
          assert.strictEqual(DateClass.fromString(time + zone).timeshift.value, hours * 60)
        })
      }

      test("the same zone as its standard or daylight name", () => {
        assert.strictEqual(DateClass.fromString("2009-07-19 05:54PT").timeshift.value, DateClass.fromString("2009-07-19 05:54PDT").timeshift.value)
        assert.strictEqual(DateClass.fromString("2009-12-01 05:54PT").timeshift.value, DateClass.fromString("2009-12-01 05:54PST").timeshift.value)
      })
    })
  }

  test("is read in an interval", () => {
    const interval = Level2Date.fromString("2009-07-19 05:54PT")
    assert.strictEqual(interval.toString(), "2009-07-19T05:54-07")
  })

  test("depends on the date, so it cannot be read alone", () => {
    assert.throws(() => Level0Timeshift.fromString("PT"), EDTFError)
    assert.strictEqual(Level0Timeshift.fromString("PT", undefined, { year: 2009, month: 7, day: 19 }).value, -7 * 60)
  })
})
