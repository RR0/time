import { describe, test } from "node:test"
import assert from "node:assert"
import { Level2Date } from "./Level2Date.mjs"
import { Level2Interval } from "../interval/Level2Interval.mjs"

describe("Level 2 dates qualification scope", () => {
  const names = ["year", "month", "day", "hour", "minute", "second"]

  /**
   * @param {Level2Date} date
   * @return {Object} What each component is qualified with, at its component level and at the group level.
   */
  const scopes = date => Object.fromEntries(names.filter(name => date[name]).map(name => {
    const comp = date[name]
    return [name, [
      comp.uncertainComponent ? "?" : "", comp.approximateComponent ? "~" : "",
      comp.uncertainGroup ? "?" : "", comp.approximateGroup ? "~" : ""
    ].join("")]
  }))

  describe("rendering writes each qualification where it applies", () => {
    for (const str of [
      "2004-06~", "2004-~06", "~2004-06", "2004?-06", "?2004-06", "2004-06-11~", "?2004-%06-~11", "2004?-06-~11",
      "2004-06-~11T09:~12:33Z", "2004-06-11T09:12:33~", "2004-06-11T09:12:33.123Z", "2004-06-~11T09:12:33.5Z"
    ]) {
      test(str, () => {
        const date = Level2Date.fromString(str)
        const rendered = date.toString()
        const expected = str.replace(".5Z", ".500Z")
        assert.strictEqual(rendered, expected)
        assert.deepStrictEqual(scopes(Level2Date.fromString(rendered)), scopes(date))
      })
    }
  })

  test("a qualification that follows the group is the one that applies to all of it", () => {
    assert.strictEqual(Level2Date.fromString("2004~-06~").toString(), "2004-06~", "deduced from the last one")
  })

  test("component and group levels are told apart", () => {
    const component = Level2Date.fromString("2004-~06")
    assert.strictEqual(component.month.approximateComponent, true)
    assert.strictEqual(component.year.approximateComponent, false)
    assert.strictEqual(component.year.approximate, true, "deduced from the month")
    const group = Level2Date.fromString("2004-06~")
    assert.strictEqual(group.month.approximateComponent, false)
    assert.strictEqual(group.month.approximate, true)
    assert.notStrictEqual(component.toString(), group.toString())
    assert.notStrictEqual(Level2Date.fromString("~2004-06").toString(), Level2Date.fromString("2004~-06").toString())
  })

  test("toSpec() keeps the approximation", () => {
    const spec = Level2Date.fromString("2004-06~").toSpec()
    assert.strictEqual(spec.month.approximate, true)
    assert.strictEqual(spec.month.uncertain, false)
    assert.strictEqual(spec.month.approximateComponent, false)
  })

  test("clone() keeps the scope", () => {
    for (const str of ["2004-06~", "2004-~06", "~2004-06", "2004?-06", "?2004-%06-~11"]) {
      const date = Level2Date.fromString(str)
      assert.strictEqual(date.clone().toString(), str)
      assert.deepStrictEqual(scopes(date.clone()), scopes(date))
    }
  })

  test("intervals", () => {
    const interval = Level2Interval.fromString("2004-~06/2005~")
    assert.strictEqual(interval.toString(), "2004-~06/2005~")
    assert.strictEqual(interval.start.month.approximateComponent, true)
    assert.strictEqual(interval.end.year.approximateComponent, false)
    assert.strictEqual(interval.end.year.approximate, true)
  })
})
