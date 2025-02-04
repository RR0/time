import { describe, test } from "node:test"
import { MonthUnit } from "./MonthUnit.mjs"
import assert from "node:assert"
import { level0DurationUnits } from "../level0/index.mjs"

import { Level0YearUnit } from "../level0/year/Level0YearUnit.mjs"

describe("MonthUnit", () => {
  /**
   * @param {MonthUnit} monthUnit
   * @param {number} daysCount
   */
  function checkMonth(monthUnit, daysCount) {
    assert.equal(monthUnit.name, "month")
    assert.equal(monthUnit.min, 1)
    assert.equal(monthUnit.max, 12)
    assert.equal(monthUnit.subUnit.min, 1)
    assert.equal(monthUnit.subUnit.max, daysCount)
    assert.equal(monthUnit.duration, daysCount * level0DurationUnits.day.duration)
  }

  test("28 days month", ()=> {
    const monthUnit = Level0YearUnit.Month28
    checkMonth(monthUnit, 28)
    assert.equal(monthUnit.subUnit.max, 28)
    const february = Level0MonthUnit.create(2, 1999)
    checkMonth(february, 28)
  })

  test("29 days month", ()=> {
    const monthUnit = Level0YearUnit.Month29
    checkMonth(monthUnit, 29)
    const leapFebruary = Level0MonthUnit.create(2, 2000)
    checkMonth(leapFebruary, 29)
  })

  test("30 days month", ()=> {
    const monthUnit = Level0YearUnit.Month30
    checkMonth(monthUnit, 30)
    const april = Level0MonthUnit.create(4, 1999)
    checkMonth(april, 30)
    const leapApril = Level0MonthUnit.create(4, 2000)
    checkMonth(leapApril, 30)
  })

  test("31 days month", ()=> {
    const monthUnit = Level0YearUnit.Month31
    checkMonth(monthUnit, 31)
    const march = Level0MonthUnit.create(3, 1999)
    checkMonth(march, 31)
    const leapMarch = Level0MonthUnit.create(3, 2000)
    checkMonth(leapMarch, 31)
    const july = Level0MonthUnit.create(7, 2000)
    checkMonth(july, 31)
    const august = Level0MonthUnit.create(8, 2000)
    checkMonth(july, 31)
  })
})
