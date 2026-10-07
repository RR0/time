import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Date } from "./level0/date/Level0Date.mjs"
import { Level1Date } from "./level1/date/Level1Date.mjs"
import { Level2Date } from "./level2/date/Level2Date.mjs"

describe("fromDate() time zone", () => {
  const withTimeZone = (timeZone, fn) => {
    const previous = process.env.TZ
    process.env.TZ = timeZone
    try {
      fn()
    } finally {
      if (previous === undefined) {
        delete process.env.TZ
      } else {
        process.env.TZ = previous
      }
    }
  }

  for (const [name, DateClass] of [["level 0", Level0Date], ["level 1", Level1Date], ["level 2", Level2Date]]) {
    describe(name, () => {
      test("east of UTC is positive", () => {
        withTimeZone("Europe/Paris", () => {
          assert.strictEqual(DateClass.fromDate(new Date(2001, 11, 13)).timeshift.value, 60)
          assert.strictEqual(DateClass.fromDate(new Date(2001, 5, 13)).timeshift.value, 120, "summer time")
        })
      })

      test("west of UTC is negative", () => {
        withTimeZone("America/Los_Angeles", () => {
          assert.strictEqual(DateClass.fromDate(new Date(2001, 11, 13)).timeshift.value, -480)
        })
      })

      test("UTC is zero", () => {
        withTimeZone("UTC", () => {
          assert.strictEqual(DateClass.fromDate(new Date(2001, 11, 13)).timeshift.value, 0)
        })
      })
    })
  }

  for (const [name, DateClass] of [["level 0", Level0Date], ["level 1", Level1Date], ["level 2", Level2Date]]) {
    test(`${name} reads each component of the date`, () => {
      withTimeZone("Europe/Paris", () => {
        const date = DateClass.fromDate(new Date(2001, 11, 13, 9, 30, 45))
        assert.deepStrictEqual(
          [date.year, date.month, date.day, date.hour, date.minute, date.second].map(component => component.value),
          [2001, 12, 13, 9, 30, 45])
      })
    })
  }

  test("is rendered with the right sign", () => {
    withTimeZone("Europe/Paris", () => {
      assert.ok(Level2Date.fromDate(new Date(2001, 11, 13)).toString().endsWith("+01"))
    })
    withTimeZone("America/Los_Angeles", () => {
      assert.ok(Level2Date.fromDate(new Date(2001, 11, 13)).toString().endsWith("-08"))
    })
  })

  test("is read back as the same offset", () => {
    withTimeZone("Europe/Paris", () => {
      const date = Level2Date.fromDate(new Date(2001, 11, 13, 9, 30))
      assert.strictEqual(Level2Date.fromString(date.toString()).timeshift.value, date.timeshift.value)
    })
  })

  test("default date uses the local offset", () => {
    withTimeZone("Europe/Paris", () => {
      const offset = new Level0Date().timeshift.value
      assert.ok(offset === 60 || offset === 120)
    })
  })
})
