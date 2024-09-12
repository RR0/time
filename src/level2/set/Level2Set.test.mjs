import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Set } from "./Level2Set.mjs"
import Level2Year from "../year/Level2Year.mjs"
import { Level2Interval } from "../interval/index.mjs"
import { Level2Date } from "../date/index.mjs"
import Level2Month from "../month/Level2Month.mjs"

describe("Level2Set", () => {

  describe("any", () => {

    test("year or month", () => {
      const set = Level2Set.fromString("[1667,1760-12]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1666"))
      assert.ok(!set.has(new Level2Year(1666)))
      assert.ok(set.has("1667"))
      assert.ok(set.has(new Level2Year(1667)))
      assert.ok(!set.has("1668"))
      assert.ok(!set.has("1759"))
      assert.ok(!set.has("1760-01"))
      assert.ok(set.has("1760-12"))
      assert.ok(set.has(new Level2Date({ year: new Level2Year(1760), month: new Level2Month(12) })))
      // assert.ok(set.has("1760-12-24"))
      assert.ok(!set.has("1761"))
    })

    test("open start", () => {
      const set = Level2Set.fromString("[..1984]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1883"))
      assert.ok(!set.has("1983"))
      assert.ok(set.has("..1984"))
      assert.ok(set.has(new Level2Interval(null, new Level2Date({ year: 1984 }))))
      assert.ok(set[Symbol.iterator]().next().value)
      //  assert.ok(set.has("1984"))
      //   assert.ok(set.has("1984-12-31"))
      assert.ok(!set.has("1985"))
    })

    test("years and interval", () => {
      const set = Level2Set.fromString("[1667,1668,1670..1672]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1666"))
      assert.ok(set.has("1667"))
      assert.ok(set.has("1668"))
      //  assert.ok(set.has("1670"))
      //   assert.ok(set.has("1671"))
      // assert.ok(set.has("1672"))
      assert.ok(!set.has("1673"))
    })

    test("date or before", () => {
      const set = Level2Set.fromString("[..1760-12-03]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1492"))
      assert.ok(!set.has("1512-06"))
      // assert.ok(set.has("1760-12-02"))
      assert.ok(set.has("..1760-12-03"))
      // assert.ok(set.has("1760-12-03T16:30"))
      assert.ok(!set.has("1760-12-04"))
      assert.ok(!set.has("2001"))
    })

    test("month or after", () => {
      const set = Level2Set.fromString("[1760-12..]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1492"))
      assert.ok(!set.has("1512-06"))
      assert.ok(!set.has("1760-11-30"))
      // assert.ok(set.has("1760-12-02"))
      // assert.ok(set.has("1760-12-02T16:30"))
      // assert.ok(set.has("1760-12-03"))
      assert.ok(!set.has("2001"))
    })

    test("months or after", () => {
      const set = Level2Set.fromString("[1760-01,1760-02,1760-12..]")
      assert.equal(set.exclusive, true)
      assert.ok(!set.has("1759"))
      assert.ok(!set.has("1760"))
      // assert.ok(set.has("1760-01"))
      // assert.ok(set.has("1760-01-12"))
      assert.ok(set.has("1760-02"))
      // assert.ok(set.has("1760-02-13"))
      // assert.ok(!set.has("1760-03"))
      assert.ok(set.has("1760-12.."))
      // TODO: assert.ok(set.has("1760-12"))
      // assert.ok(set.has("1760-12-20"))
      // TODO: assert.ok(set.has("2001"))
    })
  })

  describe("all", () => {

    test("year or month", () => {
      const set = Level2Set.fromString("{1667,1760-12}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1666"))
      assert.ok(!set.has(new Level2Year(1666)))
      assert.ok(set.has("1667"))
      assert.ok(set.has(new Level2Year(1667)))
      assert.ok(!set.has("1668"))
      assert.ok(!set.has("1759"))
      assert.ok(!set.has("1760-01"))
      assert.ok(set.has("1760-12"))
      assert.ok(set.has(new Level2Date({ year: new Level2Year(1760), month: new Level2Month(12) })))
      // assert.ok(set.has("1760-12-24"))
      assert.ok(!set.has("1761"))
    })

    test("open start", () => {
      const set = Level2Set.fromString("{..1984}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1883"))
      assert.ok(!set.has("1983"))
      assert.ok(set.has("..1984"))
      assert.ok(set.has(new Level2Interval(null, new Level2Date({ year: 1984 }))))
      assert.ok(set[Symbol.iterator]().next().value)
      //  assert.ok(set.has("1984"))
      //   assert.ok(set.has("1984-12-31"))
      assert.ok(!set.has("1985"))
    })

    test("years and interval", () => {
      const set = Level2Set.fromString("{1667,1668,1670..1672}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1666"))
      assert.ok(set.has("1667"))
      assert.ok(set.has("1668"))
      //  assert.ok(set.has("1670"))
      //   assert.ok(set.has("1671"))
      // assert.ok(set.has("1672"))
      assert.ok(!set.has("1673"))
    })

    test("date or before", () => {
      const set = Level2Set.fromString("{..1760-12-03}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1492"))
      assert.ok(!set.has("1512-06"))
      // assert.ok(set.has("1760-12-02"))
      assert.ok(set.has("..1760-12-03"))
      // assert.ok(set.has("1760-12-03T16:30"))
      assert.ok(!set.has("1760-12-04"))
      assert.ok(!set.has("2001"))
    })

    test("month or after", () => {
      const set = Level2Set.fromString("{1760-12..}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1492"))
      assert.ok(!set.has("1512-06"))
      assert.ok(!set.has("1760-11-30"))
      // assert.ok(set.has("1760-12-02"))
      // assert.ok(set.has("1760-12-02T16:30"))
      // assert.ok(set.has("1760-12-03"))
      assert.ok(!set.has("2001"))
    })

    test("months or after", () => {
      const set = Level2Set.fromString("{1760-01,1760-02,1760-12..}")
      assert.equal(set.exclusive, false)
      assert.ok(!set.has("1759"))
      assert.ok(!set.has("1760"))
      // assert.ok(set.has("1760-01"))
      // assert.ok(set.has("1760-01-12"))
      assert.ok(set.has("1760-02"))
      // assert.ok(set.has("1760-02-13"))
      // assert.ok(!set.has("1760-03"))
      assert.ok(set.has("1760-12.."))
      // TODO: assert.ok(set.has("1760-12"))
      // assert.ok(set.has("1760-12-20"))
      // TODO: assert.ok(set.has("2001"))
    })
  })
})
