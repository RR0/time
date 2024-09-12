import { describe, test } from "node:test"
import assert from "node:assert"

import { edtf } from "./index.js"
import { level2 } from "./level2/index.mjs"
import * as Level2Date from "./level2/date/Level2Date.mjs"
import { Level2Date as EdtfDate } from "./level2/date/index.mjs"
import { EdtfYear } from "./level2/year/index.mjs"

describe("index", () => {

  test("level0", () => {
    assert.ok(edtf.level0)
  })

  test("level1", () => {
    assert.ok(edtf.level1)
  })

  test("level2", () => {
    assert.ok(edtf.level2)
    assert.ok(level2)
    assert.ok(Level2Date)
    assert.ok(EdtfDate)
    assert.ok(EdtfYear)
  })
})
