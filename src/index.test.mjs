import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Date } from "./level2/index.mjs"
import { Level2Date as EdtfDate } from "./level2/date/index.mjs"
import { Level2Year as EdtfYear } from "./level2/year/index.mjs"
import { Level2Interval as EdtfInterval } from "./index.js"

describe("index", () => {

  test("level2", () => {
    assert.ok(Level2Date)
    assert.ok(EdtfDate)
    assert.ok(EdtfYear)
    assert.ok(EdtfInterval)
  })
})
