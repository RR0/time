import { TimeContext } from "./TimeContext.mjs"
import { describe, test } from "node:test"
import assert from "node:assert"

describe("TimeContext", () => {

  const timeContext = new TimeContext()

  const SECOND = 1000

  test("duration seconds", () => {
    timeContext.updateFromStr("P10S")
    const value = timeContext.duration.value
    assert.equal(value, 10 * SECOND)
  })

  test("updateFromStr year", () => {
    timeContext.updateFromStr("1989")
    assert.equal(timeContext.from, undefined)
    assert.equal(timeContext.getYear(), 1989)
  })

  test("updateFromStr year interval", () => {
    timeContext.updateFromStr("1989/2001")
    const toYearVal = timeContext.to.year
    const toYear = toYearVal.value
    assert.equal(toYear, 2001)
    const fromYearVal = timeContext.from.year
    const fromYear = fromYearVal.value
    assert.equal(fromYear, 1989)
  })

  test("updateFromStr year from", () => {
    timeContext.updateFromStr("1989/")
    const fromYearVal = timeContext.from.year
    const fromYear = fromYearVal.value
    assert.equal(fromYear, 1989)
    assert.equal(timeContext.to, undefined)
    assert.equal(timeContext.getYear(), undefined)
  })

  test("updateFromStr year to", () => {
    timeContext.updateFromStr("/2001")
    assert.equal(timeContext.from, undefined)
    const toYearVal = timeContext.to.year
    const toYear = toYearVal.value
    assert.equal(toYear, 2001)
    assert.equal(timeContext.getYear(), undefined)
  })

  test("updateFromStr year-month", () => {
    timeContext.updateFromStr("1989-10")
    assert.equal(timeContext.getYear(), 1989)
    assert.equal(timeContext.getMonth(), 10)
  })

  test("updateFromStr year-month-day", () => {
    timeContext.updateFromStr("1989-10-25")
    assert.equal(timeContext.getYear(), 1989)
    assert.equal(timeContext.getMonth(), 10)
    assert.equal(timeContext.getDayOfMonth(), 25)
  })

  test("updateFromStr year-month-day hour:minutes", () => {
    timeContext.updateFromStr("1989-10-25 12:55")
    assert.equal(timeContext.getYear(), 1989)
    assert.equal(timeContext.getMonth(), 10)
    assert.equal(timeContext.getDayOfMonth(), 25)
    assert.equal(timeContext.getHour(), 12)
    assert.equal(timeContext.getMinutes(), 55)
  })
})
