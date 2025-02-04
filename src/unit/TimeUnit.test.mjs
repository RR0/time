import { describe, test } from "node:test"
import { level0YearUnit } from "../level0/index.mjs"
import assert from "node:assert"

describe("TimeUnit", () => {

  /**
   * @param {TimeUnit} unit
   * @param {number} min
   * @param {number} max
   * @param {any[]} result
   */
  function checkUnitValues (unit, min, max, result) {
    assert.equal(unit.min, min)
    assert.equal(unit.max, max)
    assert.equal(result.length, max - min + 1)
    assert.equal(result[0], min)
    assert.equal(result[max], max)
  }

  describe("year", () => {

    const min = 0
    const max = 9999

    function checkValues (result) {
      checkUnitValues(level0YearUnit, min, max, result)
    }

    test("iterator", () => {
      const result = []
      for (let year of level0YearUnit) {
        result.push(year)
      }
      checkValues(result)
      for (let year of level0YearUnit) {
        assert.equal(year, min)   // Iterating again restarts from min
        break
      }
    })
  })
})
