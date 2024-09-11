import { describe, test } from "node:test"
import assert from "node:assert"

import edtf from "./index.mjs"

describe("EDTF", () => {

  describe("level0", () => {
    const level0 = edtf.level0
    assert.ok(level0.Date)
    assert.ok(level0.Year)
    assert.ok(level0.Month)
    assert.ok(level0.Day)
  })

  test("level1", () => {
    const level1 = edtf.level1
    assert.ok(level1.Date)
    assert.ok(level1.Year)
    assert.ok(level1.Month)
    assert.ok(level1.Day)
  })

  test("level2", () => {
    const level2 = edtf.level2
    assert.ok(level2.Date)
    assert.ok(level2.Year)
    assert.ok(level2.Month)
    assert.ok(level2.Day)
  })
})
