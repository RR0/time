import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2IntervalParser } from "./Level2IntervalParser.mjs"

describe("Level2IntervalParser", () => {

  test("parse", () => {
    const parser = new Level2IntervalParser()
    assert.ok(Level2IntervalParser.format.includes("d+E"))
    assert.ok(parser.regExp.source.includes("d+E"))
    const parsed = parser.parse("2023-12-?08/2024-12~")
    assert.equal(parsed.start.year.value, 2023)
  })
})
